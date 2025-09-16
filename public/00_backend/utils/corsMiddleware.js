const corsMiddleware = (req, res, next) => {
  // 1. No Access-Control-Allow-Origin Header
  const allowedOrigin =
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL_PRODUCTION // Produktions-Domain
      : process.env.FRONTEND_URL_LOCAL; // Entwicklungs-Domain
  const origin = req.headers.origin;

console.log("cors allowedOrigin:", allowedOrigin);
  if (origin && origin === allowedOrigin) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    console.warn(`Blocked CORS request from origin: ${origin}`); // Warnung für blockierte Anfragen
    return res.status(403).send("CORS policy: This origin is not allowed.");
  }

  // 2. Credentials Not Allowed
  res.header("Access-Control-Allow-Credentials", "true");

  // 3. Method Not Allowed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // 4. No Access-Control-Allow-Headers Header
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 5. Preflight Request Handling (OPTIONS request)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

module.exports = { corsMiddleware };
