import React from 'react'

export default function SettingsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Settings</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div>
          <p className="text-sm text-slate-600">LLM / editor / other settings will be here.</p>
        </div>
      </div>
    </div>
  )
}
