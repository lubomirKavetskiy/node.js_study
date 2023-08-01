const { error } = require('console');
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // console.log('Server request', req.url, req.method, req.headers);

  // res.setHeader('Content-Type', 'text/html');

  // res.write('<head><link rel="stylesheet" href="#"/></head>');
  // res.write('<h1>Hello from Node.js</h1>');
  // res.write('<p>My name is Lubomir</p>');

  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify({
    name: 'Lubomir',
    age: 36,
    job: 'Frontend'
  });
  res.write(data);

  res.end();
} );

server.listen(PORT, 'localhost', error => {
  if (error) {
    console.log('Error starting server');
  } else {
    console.log(`Listening port ${PORT}`);
  }
});
