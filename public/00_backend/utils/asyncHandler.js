// Async Handler Wrapper um async/await Fehler automatisch zu behandeln
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;