export let TOKEN_KEY = 'auth-token'
export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY)
  return token
}

export function setToken(val) {
  localStorage.setItem(TOKEN_KEY, val)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}