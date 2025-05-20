"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ProtectedRoute from "@/components/protected-route"

// Mock data for appointments
const appointmentsData = [
  {
    id: 1,
    doctor: {
      name: "Dr. Abir Banik",
      specialty: "Fart Analyst",
      image: "/images/doctors/doctor3.png",
    },
    date: "2025-05-20",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: {
      name: "Dr. Rahat Khandokar",
      specialty: "Urologist",
      image: "/images/doctors/doctor2.png",
    },
    date: "2025-05-25",
    time: "2:30 PM",
    status: "upcoming",
  },
  {
    id: 3,
    doctor: {
      name: "Dr. Deedat Chowdhury",
      specialty: "Plastic Surgeon",
      image: "/images/doctors/doctor1.png",
    },
    date: "2025-04-15",
    time: "9:30 AM",
    status: "completed",
  },
  {
    id: 4,
    doctor: {
      name: "Dr. Kazi Anwar",
      specialty: "Flatulogist",
      image: "/images/doctors/doctor5.png",
    },
    date: "2025-04-05",
    time: "11:00 AM",
    status: "cancelled",
  },
  {
    id: 5,
    doctor: {
      name: "Dr. Sajid Sehgal",
      specialty: "Sexologist",
      image: "/images/doctors/doctor4.png",
    },
    date: "2025-05-05",
    time: "11:11 AM",
    status: "cancelled",
  },
]

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all")

  // Filter appointments based on selected filter
  const filteredAppointments =
    filter === "all" ? appointmentsData : appointmentsData.filter((appointment) => appointment.status === filter)

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <ProtectedRoute>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>My Appointments</h1>
          <div className="d-flex gap-2">
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("isAuthenticated")
                  localStorage.removeItem("userEmail")
                  window.location.href = "/"
                }
              }}
              className="btn btn-outline-danger"
            >
              Logout
            </button>
            <Link href="/appointments/book" className="btn btn-primary">
              Book New Appointment
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link href="/doctors" className="nav-link">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/appointments" className="nav-link active">
                My Appointments
              </Link>
            </li>
          </ul>
        </div>

        {/* Filter Tabs */}
        <div className="mb-4">
          <ul className="nav nav-pills">
            <li className="nav-item me-2">
              <button
                className={`nav-link ${filter === "all" ? "active bg-primary text-white" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item me-2">
              <button
                className={`nav-link ${filter === "upcoming" ? "active bg-primary text-white" : ""}`}
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </button>
            </li>
            <li className="nav-item me-2">
              <button
                className={`nav-link ${filter === "completed" ? "active bg-primary text-white" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "cancelled" ? "active bg-primary text-white" : ""}`}
                onClick={() => setFilter("cancelled")}
              >
                Cancelled
              </button>
            </li>
          </ul>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-5">
            <p className="mb-3">No appointments found.</p>
            <Link href="/appointments/book" className="btn btn-primary">
              Book an Appointment
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="col-md-6">
                <div
                  className={`card border-0 shadow-sm ${
                    appointment.status === "upcoming"
                      ? "border-start border-primary border-4"
                      : appointment.status === "completed"
                        ? "border-start border-success border-4"
                        : "border-start border-danger border-4"
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex">
                        <Image
                          src={appointment.doctor.image || "/placeholder.svg"}
                          alt={appointment.doctor.name}
                          width={60}
                          height={60}
                          className="rounded-circle me-3"
                        />
                        <div>
                          <h5 className="card-title mb-1">{appointment.doctor.name}</h5>
                          <p className="card-text text-muted">{appointment.doctor.specialty}</p>
                        </div>
                      </div>
                      <span
                        className={`badge ${
                          appointment.status === "upcoming"
                            ? "bg-primary"
                            : appointment.status === "completed"
                              ? "bg-success"
                              : "bg-danger"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted me-2"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-muted me-2"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>

                    {appointment.status === "upcoming" && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary flex-grow-1">Reschedule</button>
                        <button className="btn btn-outline-danger flex-grow-1">Cancel</button>
                      </div>
                    )}

                    {appointment.status === "completed" && (
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary flex-grow-1">View Details</button>
                        <button className="btn btn-primary flex-grow-1">Book Again</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
