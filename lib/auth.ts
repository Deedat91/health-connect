// Simple client-side authentication utility

// Store auth state in localStorage to persist across page refreshes
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export const login = (email: string, password: string): boolean => {
  // Check for the specific credentials
  if (email === "Adeedat.official@gmail.com" && password === "Dee6462772.") {
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email)
    return true
  }
  return false
}

export const logout = (): void => {
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("userEmail")
}

export const getUserEmail = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("userEmail")
}
