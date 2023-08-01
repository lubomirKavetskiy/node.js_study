const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

const PORT = 3000;

app.set('view engine', 'ejs');

app.listen(PORT, 'localhost', error => {
  error
  ? console.log('Error starting server')
  : console.log(`Listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

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
  const post = {
    id: '1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '01.08.2023',
    author: 'Lubomir',
  };

  res.render(createPath('post'), {title, post});
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [{
    id: '1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '01.08.2023',
    author: 'Lubomir',
  }];

  res.render(createPath('posts'), {title, posts});
});

app.post('/add-post', (req, res) => {
  const {title, author, text} = req.body;
  const post = {id: new Date(), title, author, text, date: new Date().toLocaleDateString()};

  res.render(createPath('post'), {title: 'Post', post});
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