export const responseWrapper = (_req, res, next) => {
  res.success = (data, statusCode = 200, meta = {}) => {
    res.status(statusCode).json({
      success: true,
      data,
      actionAt: new Date().toISOString(),
      ...meta,
    })
  }
  res.fail = (message, statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      message,
      actionAt: new Date().toISOString(),
    })
  }
  next()
}
