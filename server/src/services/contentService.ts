import mongoose from 'mongoose'
import DynamicContent, { type IDynamicContent } from '../models/DynamicContent.js'

export const getActiveContent = () =>
  DynamicContent.find({ isActive: true }).sort({ createdAt: -1 }).lean()

export const getAllContent = () =>
  DynamicContent.find().sort({ createdAt: -1 }).lean()

export const createContent = (
  data: Partial<IDynamicContent>,
  publishedBy: mongoose.Types.ObjectId | string
) => DynamicContent.create({ ...data, publishedBy })

export const updateContent = (id: string, data: Partial<IDynamicContent>) =>
  DynamicContent.findByIdAndUpdate(id, data, { new: true, runValidators: true })

export const deactivateContent = (id: string) =>
  DynamicContent.findByIdAndUpdate(id, { isActive: false }, { new: true })
