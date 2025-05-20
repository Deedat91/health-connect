import { NextResponse } from "next/server"

// This is a simple mock database for demonstration purposes
// In a real application, you would use a proper database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "demo@example.com",
    password: "password", // In a real app, this would be hashed
    userType: "patient",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, password, name, userType } = body

    // Handle signup
    if (action === "signup") {
      // Check if user already exists
      const existingUser = users.find((user) => user.email === email)
      if (existingUser) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
      }

      // In a real app, you would hash the password before storing it
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // Should be hashed in production
        userType,
      }

      // Add user to our mock database
      users.push(newUser)

      return NextResponse.json(
        { message: "User created successfully", user: { id: newUser.id, name, email, userType } },
        { status: 201 },
      )
    }

    // Handle login
    if (action === "login") {
      // Find user by email
      const user = users.find((user) => user.email === email)

      // Check if user exists and password matches
      if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // In a real app, you would create a session or JWT token here
      return NextResponse.json(
        {
          message: "Login successful",
          user: { id: user.id, name: user.name, email: user.email, userType: user.userType },
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
