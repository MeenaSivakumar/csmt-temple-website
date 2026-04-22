export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

export const capitalize = (str: string): string =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const truncate = (str: string, max = 80): string =>
  str.length > max ? `${str.slice(0, max)}…` : str
