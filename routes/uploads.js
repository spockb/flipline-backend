import { Router } from "express";
import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = Router();

const s3 = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

router.post("/uploads/presign", async (req, res) => {
  try {
    const { contentType, ext } = req.body || {};
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(contentType)) {
      return res.status(400).json({ error: "Unsupported content type" });
    }

    const safeExt =
      String(ext || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "jpg";
    const key = `properties/${crypto.randomUUID()}.${safeExt}`;

    const putCmd = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, putCmd, { expiresIn: 300 });
    const publicUrl = process.env.S3_PUBLIC_BASE
      ? `${process.env.S3_PUBLIC_BASE}/${key}`
      : `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`;

    return res.json({ url, key, publicUrl });
  } catch (e) {
    console.error("[R2 presign error]", e);
    return res
      .status(500)
      .json({ error: "Presign failed", detail: e?.message || "unknown" });
  }
});

export default router;
