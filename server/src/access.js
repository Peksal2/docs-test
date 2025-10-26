export function requireAccess(required) {
  return (req, res, next) => {
    const access = req.user?.access || [];
    if (access.includes("admin")) return next();

    const need = Array.isArray(required) ? required : [required];
    const ok = need.every((role) => access.includes(role));
    if (!ok) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
