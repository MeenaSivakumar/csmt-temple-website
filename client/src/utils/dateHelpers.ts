import { format, parseISO, differenceInHours, isAfter } from 'date-fns'

export const formatDate = (date: string): string => format(parseISO(date), 'dd MMM yyyy')

export const formatDateTime = (date: string): string =>
  format(parseISO(date), 'dd MMM yyyy, hh:mm a')

export const formatTime = (date: string): string => format(parseISO(date), 'hh:mm a')

export const hoursUntilExpiry = (reservedAt: string): number =>
  24 - differenceInHours(new Date(), parseISO(reservedAt))

export const isExpired = (reservedAt: string): boolean =>
  differenceInHours(new Date(), parseISO(reservedAt)) >= 24

export const isFuture = (date: string): boolean => isAfter(parseISO(date), new Date())
