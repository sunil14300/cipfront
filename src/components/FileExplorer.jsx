import React from 'react'
import { File, Plus, Trash2, Edit } from 'lucide-react'
import './FileExplorer.css' // ✅ Import the CSS

export default function FileExplorer({ files = [], active, onOpen, onChange }) {
  const promptUser = (msg, def = '') => window.prompt(msg, def)
  const confirmUser = (msg) => window.confirm(msg)

  const addFile = () => {
    const name = promptUser('File name (e.g. App.js)')
    if (!name) return
    if (files.some(f => f.name === name)) return alert('File name already exists.')

    onChange([...files, { name, content: '' }])
  }

  const deleteFile = (name) => {
    if (!confirmUser(`Delete ${name}? This cannot be undone.`)) return
    const updated = files.filter(f => f.name !== name)
    onChange(updated)
    if (active === name && updated.length > 0) onOpen(updated[0].name)
    else if (active === name) onOpen(null)
  }

  const renameFile = (file) => {
    const newName = promptUser('New name', file.name)
    if (!newName || newName === file.name) return
    if (files.some(f => f.name === newName)) return alert('File name already exists.')

    const updated = files.map(f => f.name === file.name ? { ...f, name: newName } : f)
    onChange(updated)
    if (active === file.name) onOpen(newName)
  }

  const getFileIcon = (name) => {
    const ext = name.split('.').pop()
    const colors = { js: '#facc15', jsx: '#facc15', css: '#3b82f6', html: '#f97316' }
    const color = colors[ext] || '#94a3b8'
    return <File size={16} style={{ color }} />
  }

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h4 className="file-explorer-title">Project Files</h4>
        <button className="file-add-btn" onClick={addFile}>
          <Plus size={16} /> Add File
        </button>
      </div>

      <ul className="file-list">
        {files.length === 0 && (
          <li className="file-list-empty">No files in project. Add one!</li>
        )}

        {files.map(f => (
          <li
            key={f.name}
            className={`file-item ${active === f.name ? 'active' : ''}`}
            onClick={() => onOpen(f.name)}
          >
            <div className="file-info">
              {getFileIcon(f.name)}
              <span className={`file-name ${active === f.name ? '' : 'inactive'}`}>
                {f.name}
              </span>
            </div>

            <div className="file-actions">
              <button
                className="file-action-btn rename"
                onClick={(e) => { e.stopPropagation(); renameFile(f) }}
                title="Rename"
              >
                <Edit size={14} />
              </button>
              <button
                className="file-action-btn delete"
                onClick={(e) => { e.stopPropagation(); deleteFile(f.name) }}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
