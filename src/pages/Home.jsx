import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { FileText, Plus } from 'lucide-react'
import './Home.css'  // ✅ Import the CSS file

export default function Home() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data)).catch(() => {})
  }, [])

  const create = async () => {
    if (!title) return
    const res = await api.post('/projects', {
      title,
      files: [{
        name: 'App.js',
        content: 'import React from "react";\n\nexport default function App() {\n  return (\n    <div className="text-center p-10">\n      <h1 className="text-2xl font-bold">Hello CipherStudio!</h1>\n      <p>Start coding in App.js</p>\n    </div>\n  );\n}'
      }]
    })
    nav(`/project/${res.data._id}`)
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to CipherStudio</h1>
        <p>Your personal React development environment in the browser.</p>
      </div>

      <div className="create-section">
        <div className="create-box">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Name your new project..."
            className="project-input"
          />
          <button onClick={create} className="create-btn">
            <Plus size={20} /> Create New
          </button>
        </div>
      </div>

      <section className="projects-section">
        <h2>Your Projects ({projects.length})</h2>
        <div className="projects-grid">
          {projects.map(p => (
            <div
              key={p._id}
              className="project-card"
              onClick={() => nav(`/project/${p._id}`)}
            >
              <h3>{p.title}</h3>
              <p>{p.files?.length || 0} files</p>
              <div className="project-footer">
                <span className="open-project">
                  <FileText size={14} /> Open Project
                </span>
                <span className="created-date">
                  Created {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="no-projects">No projects found. Create your first one!</p>
        )}
      </section>
    </div>
  )
}
