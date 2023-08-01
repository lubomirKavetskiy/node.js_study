const express = require('express');
const path = require('path');

const app = express();

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

const PORT = 3000;

app.listen(PORT, 'localhost', error => {
  error
  ? console.log('Error starting server')
  : console.log(`Listening port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use((req, res) => {
  res
  .status(404)
  .sendFile(createPath('error'));
});