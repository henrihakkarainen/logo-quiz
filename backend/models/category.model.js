const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    en: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    fi: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  },
  description: {
    en: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    fi: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    }
  },
  published: {
    type: Boolean,
    default: false
  },
  backgroundImageURL: {
    type: String,
    required: false
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;