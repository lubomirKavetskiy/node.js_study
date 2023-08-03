const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

const PORT = 3000;
const db = 'mongodb+srv://lubomirkavetskiy:qwerty1Q@cluster0.k0fqd4t.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log('MongoDB connected'))
  .catch((err)=> console.log(err));

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
  const post = new Post({title, author, text});

  post
    .save()
    .then((result)=> res.send(result))
    .catch((err)=> {
      console.log(err);
      res.redirect(404, createPath('error'), {title: 'Error page'});
    });
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