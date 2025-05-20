// Types for our appointment data
export interface Doctor {
  id: number
  name: string
  specialty: string
  image: string
}

export interface Appointment {
  id: number
  doctor: {
    name: string
    specialty: string
    image: string
  }
  date: string
  time: string
  reason?: string
  status: "upcoming" | "completed" | "cancelled"
}

// Initial mock data for appointments
const initialAppointments: Appointment[] = [
  {
    id: 1,
    doctor: {
      name: "Dr. Abir Banik",
      specialty: "Fart Analyst",
      image: "/images/doctors/doctor3.png",
    },
    date: "2025-05-23",
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

// Get appointments from localStorage or use initial data if none exists
export const getAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return initialAppointments

  const storedAppointments = localStorage.getItem("appointments")
  if (!storedAppointments) {
    // Initialize localStorage with our mock data on first load
    localStorage.setItem("appointments", JSON.stringify(initialAppointments))
    return initialAppointments
  }

  return JSON.parse(storedAppointments)
}

// Save a new appointment
export const saveAppointment = (appointment: Omit<Appointment, "id">): Appointment => {
  const appointments = getAppointments()

  // Generate a new ID (in a real app, this would be handled by the backend)
  const newId = appointments.length > 0 ? Math.max(...appointments.map((a) => a.id)) + 1 : 1

  const newAppointment: Appointment = {
    ...appointment,
    id: newId,
  }

  // Add to the appointments array
  appointments.push(newAppointment)

  // Save to localStorage
  localStorage.setItem("appointments", JSON.stringify(appointments))

  return newAppointment
}

// Update an existing appointment
export const updateAppointment = (updatedAppointment: Appointment): void => {
  const appointments = getAppointments()
  const index = appointments.findIndex((a) => a.id === updatedAppointment.id)

  if (index !== -1) {
    appointments[index] = updatedAppointment
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }
}

// Delete an appointment
export const deleteAppointment = (id: number): void => {
  const appointments = getAppointments()
  const filteredAppointments = appointments.filter((a) => a.id !== id)
  localStorage.setItem("appointments", JSON.stringify(filteredAppointments))
}
