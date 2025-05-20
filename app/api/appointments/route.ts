import { NextResponse } from "next/server"

// Mock database for appointments
const appointments = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    date: "2025-05-20",
    time: "10:00 AM",
    reason: "Annual checkup",
    status: "upcoming",
  },
  {
    id: 2,
    patientId: 1,
    doctorId: 2,
    date: "2025-05-25",
    time: "2:30 PM",
    reason: "Flu symptoms",
    status: "upcoming",
  },
  {
    id: 3,
    patientId: 1,
    doctorId: 3,
    date: "2025-04-15",
    time: "9:30 AM",
    reason: "Skin rash",
    status: "completed",
  },
  {
    id: 4,
    patientId: 1,
    doctorId: 4,
    date: "2025-04-05",
    time: "11:00 AM",
    reason: "Headaches",
    status: "cancelled",
  },
]

// GET handler to fetch appointments
export async function GET(request: Request) {
  try {
    // In a real app, you would verify the user's session/token
    // and only return their appointments

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patientId")
    const doctorId = searchParams.get("doctorId")
    const status = searchParams.get("status")

    let filteredAppointments = [...appointments]

    // Filter by patientId if provided
    if (patientId) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.patientId === Number.parseInt(patientId),
      )
    }

    // Filter by doctorId if provided
    if (doctorId) {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.doctorId === Number.parseInt(doctorId),
      )
    }

    // Filter by status if provided
    if (status) {
      filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === status)
    }

    return NextResponse.json(filteredAppointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST handler to create a new appointment
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patientId, doctorId, date, time, reason } = body

    // Validate required fields
    if (!patientId || !doctorId || !date || !time || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new appointment
    const newAppointment = {
      id: appointments.length + 1,
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: "upcoming",
    }

    // Add to our mock database
    appointments.push(newAppointment)

    return NextResponse.json(
      { message: "Appointment created successfully", appointment: newAppointment },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT handler to update an appointment
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status, date, time, reason } = body

    // Find the appointment
    const appointmentIndex = appointments.findIndex((appointment) => appointment.id === id)

    if (appointmentIndex === -1) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    // Update the appointment
    const updatedAppointment = {
      ...appointments[appointmentIndex],
      ...(status && { status }),
      ...(date && { date }),
      ...(time && { time }),
      ...(reason && { reason }),
    }

    appointments[appointmentIndex] = updatedAppointment

    return NextResponse.json({ message: "Appointment updated successfully", appointment: updatedAppointment })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
