const http = require('http');

function requestListener(req, res) {
  if (req.method === 'POST' && req.url === '/api/calculate') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { expression } = JSON.parse(body || '{}');
        if (!expression) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Expression cannot be empty' }));
        }
        const result = eval(expression);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid expression' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}

function createServer() {
  return http.createServer(requestListener);
}

if (require.main === module) {
  const server = createServer();
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = createServer;
