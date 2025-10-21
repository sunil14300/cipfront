import React from 'react'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import './Navbar.css' // ✅ Import the CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="flex items-center gap-4">
          <Link to="/" className="navbar-logo">
            CipherStudio
          </Link>
          {/* <div className="navbar-subtitle">
            React + Express + MongoDB
          </div> */}
        </div>

        <div className="navbar-actions">
          <button className="navbar-icon" title="Settings">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}
