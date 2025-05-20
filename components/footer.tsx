export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <h5 className="text-primary">HealthConnect</h5>
            <p className="text-muted">Connecting patients with healthcare professionals for better care.</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <span className="text-decoration-none text-muted me-3">Privacy Policy</span>
              <span className="text-decoration-none text-muted">Terms of Service</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted mb-0">© {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
