export function errorHandler(error, req, res, next) {
  console.error(`Debug: Error occurred - ${error.message}`, error.stack);
  error.status = error.status || 500;
  res.status(error.status).json({
    success: false,
    message: error.message
  });
}
