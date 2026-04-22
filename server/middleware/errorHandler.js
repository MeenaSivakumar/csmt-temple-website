export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  console.error(`[${new Date().toISOString()}] ${status} — ${message}`)
  res.status(status).json({
    success: false,
    message,
    actionAt: new Date().toISOString(),
  })
}
