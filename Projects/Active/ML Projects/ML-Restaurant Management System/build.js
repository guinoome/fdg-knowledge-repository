const fs = require('fs');
const mdPath = 'Restaurant Management System.md';
const htmlPath = 'index.html';

const mdContent = fs.readFileSync(mdPath, 'utf8');

const template = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Restaurant Management System Documentation</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #333; }
    pre { white-space: pre-wrap; background: #f5f5f5; padding: 1rem; border-radius: 4px; }
    code { background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; }
    .section { margin-bottom: 3rem; }
    .meta { color: #666; font-size: 0.9rem; }
    header { border-bottom: 1px solid #eee; margin-bottom: 2rem; padding-bottom: 1rem; }
    h1, h2, h3, h4 { color: #111; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <header>
    <h1>Restaurant Management System — Documentation</h1>
    <p class="meta">Generated: ${new Date().toISOString().split('T')[0]}</p>
  </header>

  <div id="spec" class="section">
    <div id="spec-content">Rendering...</div>
  </div>

  <script id="spec-md" type="text/plain">
${mdContent.replace(/<\/script>/g, '<\\/script>')}
  </script>

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('spec-content').innerHTML = marked.parse(document.getElementById('spec-md').textContent);
  </script>
</body>
</html>`;

fs.writeFileSync(htmlPath, template, 'utf8');
console.log('Successfully created index.html');

