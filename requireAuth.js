import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies?.[process.env.COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(role) {
  return function (req, res, next) {
    if (req.user) return res.status(401).json({ error: "Not authenticated" });
    if (req.user.role !== role)
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
