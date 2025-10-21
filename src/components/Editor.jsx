import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { Save } from 'lucide-react'
import { darcula } from '@uiw/codemirror-theme-darcula'
import './Editor.css'  // ✅ Import the CSS

export default function Editor({ file, onSave, onChange }) {
  const [value, setValue] = useState(file?.content || '')

  useEffect(() => setValue(file?.content || ''), [file?.name])

  const handleChange = (v) => {
    setValue(v)
    if (onChange) onChange(v)
  }

  const detectMode = (name='') => {
    if (name.endsWith('.html')) return html()
    if (name.endsWith('.css')) return css()
    return javascript({ jsx: name.endsWith('.jsx') || name.endsWith('.js') })
  }

  if (!file) {
    return (
      <div className="editor-empty">
        Select a file from the file explorer to start editing.
      </div>
    )
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-filename">{file.name}</div>
        <button
          onClick={() => onSave(file.name, value)}
          className="editor-save-btn"
        >
          <Save size={16} /> Manual Save
        </button>
      </div>

      <CodeMirror
        value={value}
        height="420px"
        theme={darcula}
        extensions={[detectMode(file.name)]}
        onChange={handleChange}
        className="cm-editor"
      />
    </div>
  )
}
