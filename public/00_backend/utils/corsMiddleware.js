const corsMiddleware = (req, res, next) => {
  const allowedProductionOrigin = process.env.FRONTEND_URL_PRODUCTION;
  const origin = req.headers.origin;
 
  if (!origin) {
    // Erlaube Requests ohne Origin (file://, same-origin, Postman, etc.)
    res.header("Access-Control-Allow-Origin", "*");
  } else if (process.env.NODE_ENV === "production") {
    // Produktionsumgebung: Nur spezifische Domain
    if (origin === allowedProductionOrigin) {
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      console.warn(`CORS: Blocked request from origin: ${origin}`);
      return res.status(403).send("CORS policy: This origin is not allowed.");
    }
  } else {
    // Entwicklungsumgebung: Erlaube alle 127.0.0.1 und localhost Ports
    const localhostPattern = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/;
    
    if (localhostPattern.test(origin)) {
      console.log(`CORS: ✅ Allowing localhost origin: ${origin}`);
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      console.warn(`CORS: ❌ Blocked request from origin: ${origin}`);
      return res.status(403).send("CORS policy: This origin is not allowed.");
    }
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
