const express = require("express");
const bodyParser = require("body-parser");

/**
 * Erstellt einen vorkonfigurierten Express-Router
 * @param {Object} options - Optionale Konfiguration
 * @param {boolean} options.enableLogging - Request-Logging aktivieren (default: true)
 * @returns {express.Router} Konfigurierter Router mit Standard-Middleware
 */
function enableLogging(router) {
    
  // Standard-Middleware für alle Router
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  
  // Optional: Request-Logging
  if (enableLogging) {
    router.use((req, res, next) => {
      console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
      next();
    });
  }
}

/**
 * Async-Handler Wrapper - Fängt async Errors automatisch ab
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  enableLogging,
  asyncHandler,
};