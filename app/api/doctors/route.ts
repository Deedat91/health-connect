import { NextResponse } from "next/server"

// Update the doctors array with the new names and specialties
const doctors = [
  {
    id: 1,
    name: "Dr. Abir Banik",
    specialty: "Fart Analyst",
    bio: "Dr. Banik is a board-certified fart analyst with over 15 years of experience in analyzing digestive gas compositions.",
    education: "MD from Johns Hopkins University",
    rating: 4.9,
    reviews: 124,
    availability: ["Monday", "Wednesday", "Friday"],
    image: "/images/doctors/doctor1.jpg",
  },
  {
    id: 2,
    name: "Dr. Rahat Khandokar",
    specialty: "Urologist",
    bio: "Dr. Khandokar specializes in urological care and has been practicing for 10 years.",
    education: "MD from Stanford University",
    rating: 4.8,
    reviews: 98,
    availability: ["Tuesday", "Thursday", "Saturday"],
    image: "/images/doctors/doctor2.jpg",
  },
  {
    id: 3,
    name: "Dr. Deedat Chowdhury",
    specialty: "Plastic Surgeon",
    bio: "Dr. Chowdhury is an expert in cosmetic procedures and reconstructive surgery.",
    education: "MD from University of California, San Francisco",
    rating: 4.7,
    reviews: 87,
    availability: ["Monday", "Tuesday", "Thursday"],
    image: "/images/doctors/doctor3.jpg",
  },
  {
    id: 4,
    name: "Dr. Kazi Anwar",
    specialty: "Flatulogist",
    bio: "Dr. Anwar specializes in diagnosing and treating disorders of the digestive system related to gas production.",
    education: "MD from Harvard Medical School",
    rating: 4.9,
    reviews: 112,
    availability: ["Wednesday", "Friday", "Saturday"],
    image: "/images/doctors/doctor4.jpg",
  },
  {
    id: 5,
    name: "Dr. Sajid Sehgal",
    specialty: "Sexologist",
    bio: "Dr. Sehgal is a sexologist specializing in sexual health and wellness.",
    education: "MD from Yale School of Medicine",
    rating: 4.8,
    reviews: 76,
    availability: ["Monday", "Thursday", "Friday"],
    image: "/images/doctors/doctor5.jpg",
  },
]

// GET handler to fetch doctors
export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const availability = searchParams.get("availability")
    const id = searchParams.get("id")

    // If ID is provided, return a single doctor
    if (id) {
      const doctor = doctors.find((doctor) => doctor.id === Number.parseInt(id))

      if (!doctor) {
        return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
      }

      return NextResponse.json(doctor)
    }

    let filteredDoctors = [...doctors]

    // Filter by specialty if provided
    if (specialty) {
      filteredDoctors = filteredDoctors.filter((doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase())
    }

    // Filter by availability if provided
    if (availability) {
      filteredDoctors = filteredDoctors.filter((doctor) => doctor.availability.includes(availability))
    }

    return NextResponse.json(filteredDoctors)
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
