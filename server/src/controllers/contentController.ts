import type { Request, Response, NextFunction } from 'express'
import * as svc from '../services/contentService.js'

export const getPublicContent = async (
  _req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    res.success(await svc.getActiveContent())
  } catch (err) { next(err) }
}

export const listAllContent = async (
  _req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    res.success(await svc.getAllContent())
  } catch (err) { next(err) }
}

export const addContent = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    const isActive = req.body.isActive !== 'false'
    const item = await svc.createContent(
      { ...req.body, imageUrl, isActive },
      req.user!._id as string
    )
    res.success(item, 201)
  } catch (err) { next(err) }
}

export const editContent = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    const isActive = req.body.isActive !== undefined
      ? req.body.isActive !== 'false'
      : undefined
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const item = await svc.updateContent(id, {
      ...req.body,
      ...(imageUrl && { imageUrl }),
      ...(isActive !== undefined && { isActive }),
    })
    if (!item) { res.fail('Content not found', 404); return }
    res.success(item)
  } catch (err) { next(err) }
}

export const removeContent = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const item = await svc.deactivateContent(id)
    if (!item) { res.fail('Content not found', 404); return }
    res.success(item)
  } catch (err) { next(err) }
}
