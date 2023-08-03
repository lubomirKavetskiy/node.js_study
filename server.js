const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Post = require('./models/post');
const Contacts = require('./models/contacts');

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

  Contacts
  .find()
  .then((contacts)=> {
    res.render(createPath('contacts'), {contacts, title});
  })
  .catch((err)=> {
    console.log(err);
    res.redirect(500, createPath('error'), {title: 'Error page'});
  });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const {id} = req.params;

  Post
  .findById(id)
  .then((post)=> res.render(createPath('post'), {title, post}))
  .catch((err)=> {
    console.log(err);
    res.redirect(500, createPath('error'), {title: 'Error page'});
  });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({createdAt: -1})
    .then((posts)=> res.render(createPath('posts'), {title, posts}))
    .catch((err)=> {
      console.log(err);
      res.redirect(500, createPath('error'), {title: 'Error page'});
    });
});


app.post('/add-post', (req, res) => {
  const {title, author, text} = req.body;
  const post = new Post({title, author, text});

  post
    .save()
    .then(()=> res.redirect('/posts'))
    .catch((err)=> {
      console.log(err);
      res.redirect(500, createPath('error'), {title: 'Error page'});
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