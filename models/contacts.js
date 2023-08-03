const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;
