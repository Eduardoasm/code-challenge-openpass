export function notFoundHandler(req, res, next) {
  const error = new Error(`${req.method} ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
}
