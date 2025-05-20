"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { isAuthenticated, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status when component mounts
    setAuthenticated(isAuthenticated())

    // Add event listener for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated())
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    router.push("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary me-2"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="fw-bold text-primary">HealthConnect</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            {authenticated && (
              <>
                <li className="nav-item">
                  <Link href="/doctors" className="nav-link">
                    Doctors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/appointments" className="nav-link">
                    Appointments
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex gap-2">
            {authenticated ? (
              <button onClick={handleLogout} className="btn btn-outline-primary">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline-primary">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
