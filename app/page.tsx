import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="row py-5 align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold text-primary">HealthConnect</h1>
          <p className="lead">
            Health Connect is most focused in helping you organize and observe your health in the most efficient way
          </p>
          <p className="mb-4">A Place where Care meets Clarity...</p>
          <div className="d-flex gap-3">
            <Link href="/signup" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link href="/doctors" className="btn btn-outline-primary btn-lg">
              Find Doctors
            </Link>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="position-relative hero-image-container">
            <Image
              src="/images/hero.png"
              alt="Healthcare professionals"
              width={600}
              height={400}
              className="img-fluid rounded shadow hero-image"
              priority
            />
            <div className="hero-overlay"></div>
            <div className="hero-glow"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <h2 className="text-center mb-4">Our Features</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mx-auto"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14h.01"></path>
                    <path d="M13 14h.01"></path>
                    <path d="M9 18h.01"></path>
                    <path d="M13 18h.01"></path>
                  </svg>
                </div>
                <h3 className="card-title h5">Easy Appointment Booking</h3>
                <p className="card-text">Schedule appointments with your preferred doctors in just a few clicks.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mx-auto"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="card-title h5">Doctor Profiles</h3>
                <p className="card-text">
                  View detailed profiles of healthcare professionals to make informed decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="mb-3">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mx-auto"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="card-title h5">Secure Health Records</h3>
                <p className="card-text">
                  Your health information is stored securely and accessible only to you & your doctors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
