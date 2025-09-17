/**
 * Gemeinsame Router-Basis für alle Route-Module
 * Zentralisiert Express-Setup und Middleware-Konfiguration
 */

const express = require("express");
const bodyParser = require("body-parser");

/**
 * Erstellt einen vorkonfigurierten Express-Router
 * @param {Object} options - Optionale Konfiguration
 * @param {boolean} options.enableLogging - Request-Logging aktivieren (default: true)
 * @param {boolean} options.enableCors - CORS-Headers aktivieren (default: false)
 * @returns {express.Router} Konfigurierter Router mit Standard-Middleware
 */
function createRouter(options = {}) {
  const { enableLogging = true, enableCors = false } = options;
  
  const router = express.Router();
  
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
  
  return router;
}

/**
 * Standard Error-Handler für alle Router
 */
function errorHandler(error, req, res, next) {
  console.error("Router Error:", error);
  
  // Standard-Error-Response
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Internal Server Error',
      status: error.status || 500,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Async-Handler Wrapper - Fängt async Errors automatisch ab
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Standard-Response-Helper
 */
const responseHelper = {
  success: (res, data, message = 'Success') => {
    res.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  },
  
  error: (res, message = 'Error', statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = {
  createRouter,
  errorHandler,
  asyncHandler,
  responseHelper,
  express
};