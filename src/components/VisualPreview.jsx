import { useRef, useEffect } from 'react';

export default function VisualPreview({ html, css }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 16px;
              margin: 0;
              background: #1e1e2e;
              color: #cdd6f4;
            }
            * { box-sizing: border-box; }
            ${css}
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
    doc.close();
  }, [html, css]);

  return (
    <div className="visual-preview">
      <iframe ref={iframeRef} title="Preview" sandbox="allow-same-origin" />
    </div>
  );
}
