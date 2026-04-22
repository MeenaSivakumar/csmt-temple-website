import { registerService, loginService } from '../services/authService.js'

export const register = async (req, res, next) => {
  try {
    const result = await registerService(req.body)
    res.success(result, 201)
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body)
    res.success(result)
  } catch (err) {
    next(err)
  }
}

export const getMe = (req, res) => {
  res.success({ user: req.user, actionBy: { id: req.user._id, name: req.user.name } })
}
