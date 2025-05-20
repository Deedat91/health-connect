"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"

// Mock data for doctors
const allDoctors = [
  {
    id: 1,
    name: "Dr. Abir Banik",
    specialty: "Fart Analyst",
    rating: 4.9,
    reviews: 124,
    availability: "Mon, Wed, Fri",
    availabilityDays: ["Monday", "Wednesday", "Friday"],
    image: "/images/doctors/doctor3.png",
  },
  {
    id: 2,
    name: "Dr. Rahat Khandokar",
    specialty: "Urologist",
    rating: 4.8,
    reviews: 98,
    availability: "Tue, Thu, Sat",
    availabilityDays: ["Tuesday", "Thursday", "Saturday"],
    image: "/images/doctors/doctor2.png",
  },
  {
    id: 3,
    name: "Dr. Deedat Chowdhury",
    specialty: "Plastic Surgeon",
    rating: 4.7,
    reviews: 87,
    availability: "Mon, Tue, Thu",
    availabilityDays: ["Monday", "Tuesday", "Thursday"],
    image: "/images/doctors/doctor1.png",
  },
  {
    id: 4,
    name: "Dr. Kazi Anwar",
    specialty: "Flatulogist",
    rating: 4.9,
    reviews: 112,
    availability: "Wed, Fri, Sat",
    availabilityDays: ["Wednesday", "Friday", "Saturday"],
    image: "/images/doctors/doctor5.png",
  },
  {
    id: 5,
    name: "Dr. Sajid Sehgal",
    specialty: "Sexologist",
    rating: 4.8,
    reviews: 76,
    availability: "Mon, Thu, Fri",
    availabilityDays: ["Monday", "Thursday", "Friday"],
    image: "/images/doctors/doctor4.png",
  },
]

// Get unique specialties for the dropdown
const specialties = [...new Set(allDoctors.map((doctor) => doctor.specialty))]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors)
  const [isSearching, setIsSearching] = useState(false)

  // Apply filters when search button is clicked
  const handleSearch = () => {
    setIsSearching(true)

    const filtered = allDoctors.filter((doctor) => {
      // Filter by search term (name or specialty)
      const matchesSearch =
        searchTerm === "" ||
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by specialty
      const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty

      // Filter by availability
      const matchesAvailability = selectedAvailability === "" || doctor.availabilityDays.includes(selectedAvailability)

      return matchesSearch && matchesSpecialty && matchesAvailability
    })

    setFilteredDoctors(filtered)
  }

  // Reset filters
  const handleReset = () => {
    setSearchTerm("")
    setSelectedSpecialty("")
    setSelectedAvailability("")
    setFilteredDoctors(allDoctors)
    setIsSearching(false)
  }

  return (
    <ProtectedRoute>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Find a Doctor</h1>
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
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link href="/doctors" className="nav-link active">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/appointments" className="nav-link">
                My Appointments
              </Link>
            </li>
          </ul>
        </div>

        {/* Search and Filter Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="searchDoctor" className="form-label">
                  Search
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="searchDoctor"
                  placeholder="Doctor name or specialty"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="specialty" className="form-label">
                  Specialty
                </label>
                <select
                  className="form-select"
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="availability" className="form-label">
                  Availability
                </label>
                <select
                  className="form-select"
                  id="availability"
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                >
                  <option value="">Any Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <div className="d-flex gap-2 w-100">
                  <button className="btn btn-primary flex-grow-1" onClick={handleSearch}>
                    Search
                  </button>
                  {isSearching && (
                    <button className="btn btn-outline-secondary" onClick={handleReset}>
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-5">
            <p className="mb-3">No doctors found matching your criteria.</p>
            <button className="btn btn-primary" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex mb-3">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={80}
                        height={80}
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h5 className="card-title mb-1">{doctor.name}</h5>
                        <p className="card-text text-muted mb-1">{doctor.specialty}</p>
                        <div className="d-flex align-items-center">
                          <div className="text-warning me-1">★</div>
                          <span>{doctor.rating}</span>
                          <span className="text-muted ms-1">({doctor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h6 className="mb-2">Availability</h6>
                      <p className="card-text">{doctor.availability}</p>
                    </div>

                    <div className="d-grid">
                      <Link href={`/appointments/book?doctor=${doctor.id}`} className="btn btn-primary">
                        Book Appointment
                      </Link>
                    </div>
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
