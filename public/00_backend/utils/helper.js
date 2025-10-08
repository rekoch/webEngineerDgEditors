/**
 * Async-Handler Wrapper - Fängt async Errors automatisch ab
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  asyncHandler,
};