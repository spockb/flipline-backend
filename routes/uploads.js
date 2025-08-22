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
  endpoint: process.env.S3_ENDPOINT, // e.g. https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

// 🔎 Quick “can we see the bucket?” check
router.get("/uploads/diag", async (req, res) => {
  try {
    const out = await s3.send(
      new HeadBucketCommand({ Bucket: process.env.S3_BUCKET })
    );
    return res.json({
      ok: true,
      bucket: process.env.S3_BUCKET,
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      meta: out?.$metadata,
    });
  } catch (e) {
    console.error("[R2 diag error]", e);
    return res.status(500).json({
      ok: false,
      bucket: process.env.S3_BUCKET,
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      error: e?.name,
      message: e?.message,
    });
  }
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
