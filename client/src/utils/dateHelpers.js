import { format, parseISO, differenceInHours, isAfter } from 'date-fns'

export const formatDate = (date) => format(parseISO(date), 'dd MMM yyyy')

export const formatDateTime = (date) => format(parseISO(date), 'dd MMM yyyy, hh:mm a')

export const formatTime = (date) => format(parseISO(date), 'hh:mm a')

export const hoursUntilExpiry = (reservedAt) =>
  24 - differenceInHours(new Date(), parseISO(reservedAt))

export const isExpired = (reservedAt) =>
  differenceInHours(new Date(), parseISO(reservedAt)) >= 24

export const isFuture = (date) => isAfter(parseISO(date), new Date())
