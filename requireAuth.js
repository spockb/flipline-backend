import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const COOKIE_NAME = process.env.COOKIE_NAME;
  const token = req.cookies?.[COOKIE_NAME];

  console.log(`[requireAuth] ${req.method} ${req.originalUrl}`);
  console.log(`[requireAuth] cookie name=${COOKIE_NAME}, hasCookie=${!!token}`);

  if (!token) {
    return res.status(401).json({ error: "Not authenticated (no cookie)" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    console.log(
      `[requireAuth] OK user.id=${req.user.id} role=${req.user.role}`
    );
    next();
  } catch (e) {
    console.log("[requireAuth] verify failed:", e?.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(role) {
  return function (req, res, next) {
    console.log(
      `[requireRole] ${req.method} ${req.originalUrl} user?=${!!req.user}`
    );
    if (!req.user)
      return res.status(401).json({ error: "Not authenticated (no req.user)" });
    if (req.user.role !== role)
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
