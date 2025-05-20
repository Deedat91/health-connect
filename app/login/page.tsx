"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login, isAuthenticated } from "@/lib/auth"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/doctors")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Try to log in with the provided credentials
      const success = login(formData.email, formData.password)

      if (success) {
        // Redirect to doctors page on successful login
        router.push("/doctors")
      } else {
        // Show error message for invalid credentials
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password. Please use the email & password you set when signing up",
        }))
      }
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Log In</h2>

              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Log In
                  </button>
                </div>

                <div className="text-center mb-3">
                  <span className="text-decoration-none" style={{ cursor: "pointer", color: "#0d6efd" }}>
                    Forgot Password?
                  </span>
                </div>
              </form>

              <p className="text-center mb-0">
                Don't have an account?{" "}
                <Link href="/signup" className="text-decoration-none">
                  Sign Up
                </Link>
              </p>

              {/* Demo credentials hint */}
              {/* <div className="mt-4 p-3 bg-light rounded">
                <p className="mb-1 fw-bold">Demo Credentials:</p>
                <p className="mb-1 small">Email: Adeedat.official@gmail.com</p>
                <p className="mb-0 small">Password: Dee6462772</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
