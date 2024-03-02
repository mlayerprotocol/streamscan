export const getSessionStorage = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('token')
  }
}

export const setSessionStorage = (value: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('token', value)
  }
  return value
}

export const clearSessionStorage = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.removeItem('token')
  }
}
