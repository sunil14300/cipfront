import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectEditor from './pages/ProjectEditor'
import Navbar from './components/Navbar'

export default function App() {
  return (
    // Updated background to a dark, professional slate color
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      {/* Increased max width and changed padding for better content spacing */}
      <main className="p-8 max-w-7xl mx-auto"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectEditor />} />
        </Routes>
      </main>
    </div>
  )
}
