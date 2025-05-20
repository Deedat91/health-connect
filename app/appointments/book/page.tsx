"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import ProtectedRoute from "@/components/protected-route"

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Abir Banik",
    specialty: "Fart Analyst",
    image: "/images/doctors/doctor3.png",
  },
  {
    id: 2,
    name: "Dr. Rahat Khandokar",
    specialty: "Urologist",
    image: "/images/doctors/doctor2.png",
  },
  {
    id: 3,
    name: "Dr. Deedat Chowdhury",
    specialty: "Plastic Surgeon",
    image: "/images/doctors/doctor1.png",
  },
  {
    id: 4,
    name: "Dr. Kazi Anwar",
    specialty: "Flatulogist",
    image: "/images/doctors/doctor5.png",
  },
  {
    id: 5,
    name: "Dr. Sajid Sehgal",
    specialty: "Sexologist",
    image: "/images/doctors/doctor4.png",
  },
]

// Mock time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function BookAppointmentPage() {
  const searchParams = useSearchParams()
  const doctorId = searchParams.get("doctor")

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [step, setStep] = useState<number>(1)

  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find((d) => d.id === Number.parseInt(doctorId))
      if (doctor) {
        setSelectedDoctor(doctor)
      }
    }
  }, [doctorId])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value)
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here we would normally send the appointment data to the backend
    console.log("Appointment booked:", {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason,
    })

    // Show success message and redirect
    alert("Appointment booked successfully!")
    window.location.href = "/appointments"
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <ProtectedRoute>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Book an Appointment</h2>
                <div className="d-flex justify-content-end mb-4">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("isAuthenticated")
                        localStorage.removeItem("userEmail")
                        window.location.href = "/"
                      }
                    }}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Logout
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="d-flex justify-content-center mb-4">
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle ${step >= 1 ? "bg-primary" : "bg-light"} text-white d-flex align-items-center justify-content-center`}
                      style={{ width: "30px", height: "30px" }}
                    >
                      1
                    </div>
                    <div
                      className="mx-2"
                      style={{
                        height: "2px",
                        width: "50px",
                        backgroundColor: step >= 2 ? "var(--bs-primary)" : "#dee2e6",
                      }}
                    ></div>
                    <div
                      className={`rounded-circle ${step >= 2 ? "bg-primary" : "bg-light"} text-white d-flex align-items-center justify-content-center`}
                      style={{ width: "30px", height: "30px" }}
                    >
                      2
                    </div>
                    <div
                      className="mx-2"
                      style={{
                        height: "2px",
                        width: "50px",
                        backgroundColor: step >= 3 ? "var(--bs-primary)" : "#dee2e6",
                      }}
                    ></div>
                    <div
                      className={`rounded-circle ${step >= 3 ? "bg-primary" : "bg-light"} text-white d-flex align-items-center justify-content-center`}
                      style={{ width: "30px", height: "30px" }}
                    >
                      3
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Select Doctor */}
                  {step === 1 && (
                    <div>
                      <h5 className="mb-3">Select a Doctor</h5>

                      {selectedDoctor ? (
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <Image
                                src={selectedDoctor.image || "/placeholder.svg"}
                                alt={selectedDoctor.name}
                                width={60}
                                height={60}
                                className="rounded-circle me-3"
                              />
                              <div>
                                <h5 className="card-title mb-1">{selectedDoctor.name}</h5>
                                <p className="card-text text-muted">{selectedDoctor.specialty}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row g-3 mb-3">
                          {doctors.map((doctor) => (
                            <div key={doctor.id} className="col-md-6">
                              <div
                                className="card cursor-pointer h-100"
                                onClick={() => setSelectedDoctor(doctor)}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="card-body">
                                  <div className="d-flex align-items-center">
                                    <Image
                                      src={doctor.image || "/placeholder.svg"}
                                      alt={doctor.name}
                                      width={50}
                                      height={50}
                                      className="rounded-circle me-3"
                                    />
                                    <div>
                                      <h6 className="card-title mb-1">{doctor.name}</h6>
                                      <p className="card-text text-muted small">{doctor.specialty}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNext}
                          disabled={!selectedDoctor}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Select Date and Time */}
                  {step === 2 && (
                    <div>
                      <h5 className="mb-3">Select Date and Time</h5>

                      <div className="mb-3">
                        <label htmlFor="appointmentDate" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="appointmentDate"
                          min={today}
                          value={selectedDate}
                          onChange={handleDateChange}
                          required
                        />
                      </div>

                      {selectedDate && (
                        <div className="mb-4">
                          <label className="form-label">Time</label>
                          <div className="row g-2">
                            {timeSlots.map((time) => (
                              <div key={time} className="col-md-3 col-6">
                                <div
                                  className={`card text-center p-2 ${selectedTime === time ? "bg-primary text-white" : ""}`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleTimeChange(time)}
                                >
                                  {time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNext}
                          disabled={!selectedDate || !selectedTime}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Appointment Details */}
                  {step === 3 && (
                    <div>
                      <h5 className="mb-3">Appointment Details</h5>

                      <div className="mb-3">
                        <label htmlFor="reason" className="form-label">
                          Reason for Visit
                        </label>
                        <textarea
                          className="form-control"
                          id="reason"
                          rows={3}
                          value={reason}
                          onChange={handleReasonChange}
                          placeholder="Briefly describe your symptoms or reason for the appointment"
                          required
                        ></textarea>
                      </div>

                      <div className="card mb-4">
                        <div className="card-body">
                          <h6 className="card-title">Appointment Summary</h6>
                          <div className="row mb-2">
                            <div className="col-4 text-muted">Doctor:</div>
                            <div className="col-8">{selectedDoctor?.name}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-4 text-muted">Specialty:</div>
                            <div className="col-8">{selectedDoctor?.specialty}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-4 text-muted">Date:</div>
                            <div className="col-8">
                              {new Date(selectedDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-4 text-muted">Time:</div>
                            <div className="col-8">{selectedTime}</div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                          Back
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!reason}>
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
