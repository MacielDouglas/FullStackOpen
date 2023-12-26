const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator, {
  message:
    'O livro com o título "{VALUE}" já existe. Cada livro deve ter um título único.',
});

module.exports = mongoose.model('Book', schema);
