import React, { useMemo } from 'react'

export default function Preview({ files = [] }) {
  // create an HTML bundle from files: prefer index.html, otherwise combine basic files
  const htmlContent = useMemo(() => {
    const htmlFile = files.find(f => f.name === 'index.html') || files.find(f => f.name.endsWith('.html'))
    if (htmlFile) return htmlFile.content
    // if no HTML, build a minimal html from js & css if present
    const css = files.find(f => f.name.endsWith('.css'))?.content || ''
    const js = files.find(f => f.name.endsWith('.js'))?.content || ''
    // Inject basic modern styling for the preview sandbox
    return `
      <!doctype html>
      <html>
        <head>
          <style>
            body { 
              font-family: sans-serif; 
              margin: 0; 
              background-color: #ffffff; 
              color: #333; 
            }
            ${css}
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>${js}</script>
        </body>
      </html>
    `
  }, [files])

  return (
    <div>
      <div className="mb-3 font-semibold text-slate-300 border-b border-slate-700 pb-2">Live Preview</div>
      <iframe
        title="preview"
        srcDoc={htmlContent}
        // Added 'allow-popups' for robustness, kept standard security sandboxing
        sandbox="allow-scripts allow-forms allow-modals allow-popups"
        style={{ 
          width: '100%', 
          minHeight: 400, 
          // Sleek dark border for the iframe
          border: '1px solid #0f172a', 
          borderRadius: 8,
          backgroundColor: 'white' // Ensure iframe background is white by default
        }}
      />
    </div>
  )
}
