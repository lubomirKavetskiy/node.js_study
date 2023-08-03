const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
