const express = require('express');
const path = require('path');

const app = express();

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

const PORT = 3000;

app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', error => {
  error
  ? console.log('Error starting server')
  : console.log(`Listening port ${PORT}`);
});

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), {title});
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';

  const contacts = [
    {name: "YouTube", link: "https://www.youtube.com/channel/UCQ6YiTzXgks7wW7I50_sscQ"},
    {name: "GitHub", link: "https://github.com/lubomirKavetskiy"},
    {name: "LinkedIn", link: "https://www.linkedin.com/in/lubomir-kavetskiy-%F0%9F%87%BA%F0%9F%87%A6-b67725134/"},
  ];

  res.render(createPath('contacts'), {contacts, title});
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  res.render('/post', {title});
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  res.render(createPath('posts'), {title});
});

app.get('/add-post', (req, res) => {
  const title = 'Add post';

  res.render(createPath('add-post'), {title});
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';

  res.render(createPath('contacts'), {title});
});

app.use((req, res) => {
  const title = 'Error page';

  res
  .status(404)
  .render(createPath('error'), {title});
});