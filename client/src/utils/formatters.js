export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const truncate = (str, max = 80) =>
  str && str.length > max ? `${str.slice(0, max)}…` : str
