import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import FileExplorer from '../components/FileExplorer'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import api from '../services/api'
import debounce from '../utils/debounce' 
import { AlertTriangle, CheckCircle, Save, Clock } from 'lucide-react'
import './ProjectEditor.css' // ✅ Import CSS file

export default function ProjectEditor() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [activeFile, setActiveFile] = useState(null)
  const [saveStatus, setSaveStatus] = useState('Idle') 

  useEffect(() => {
    if (!id) return
    api.get(`/projects/${id}`).then(r => {
      setProject(r.data)
      setActiveFile(r.data.files?.[0]?.name || '')
      setSaveStatus('Saved') 
    }).catch(console.error)
  }, [id])

  const saveFilesToBackend = useCallback(async (filesToSave) => {
    if (!project) return
    setSaveStatus('Saving...')
    try {
      await api.put(`/projects/${project._id}/files`, { files: filesToSave })
      setProject(p => ({ ...p, files: filesToSave }))
      setSaveStatus('Saved')
    } catch (error) {
      console.error('File save failed', error)
      setSaveStatus('Error')
    }
  }, [project])

  const debouncedSave = useMemo(() => debounce(saveFilesToBackend, 800), [saveFilesToBackend])

  const handleManualSave = useCallback(async (name, content) => {
    if (!project) return
    const updatedFiles = project.files.map(f => f.name === name ? { ...f, content } : f)
    await saveFilesToBackend(updatedFiles) 
  }, [project, saveFilesToBackend])
  
  const handleEditorChange = useCallback((content) => {
    if (!project || !activeFile) return
    
    const updatedFiles = project.files.map(f => f.name === activeFile ? { ...f, content } : f)
    setProject(p => ({ ...p, files: updatedFiles }))
    setSaveStatus('Unsaved changes...')
    debouncedSave(updatedFiles)
  }, [project, activeFile, debouncedSave])

  const updateFiles = (files) => {
    setProject(p => ({ ...p, files }))
    debouncedSave(files)
  }

  if (!project)
    return <div className="loading-text">Loading project...</div>

  const activeFileObject = project.files.find(f => f.name === activeFile)

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'Saved':
        return <span className="status saved"><CheckCircle size={14} /> Saved</span>
      case 'Saving...':
        return <span className="status saving"><Clock size={14} className="spin" /> Saving...</span>
      case 'Unsaved changes...':
        return <span className="status unsaved"><AlertTriangle size={14} /> Unsaved changes</span>
      case 'Error':
        return <span className="status error"><AlertTriangle size={14} /> Error saving</span>
      default:
        return <span className="status idle"><Clock size={14} /> Idle</span>
    }
  }

  return (
    <div className="project-editor-container">
      <aside className="sidebar">
        <FileExplorer
          files={project.files}
          active={activeFile}
          onOpen={setActiveFile}
          onChange={updateFiles}
          projectId={project._id}
        />
      </aside>

      <section className="main-section">
        <div className="editor-card">
          <div className="save-status-bar">{renderSaveStatus()}</div>
          <Editor file={activeFileObject} onSave={handleManualSave} onChange={handleEditorChange} />
        </div>

        <div className="preview-card">
          <Preview files={project.files} />
        </div>
      </section>
    </div>
  )
}
