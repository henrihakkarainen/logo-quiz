const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    en: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true
    },
    fi: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true
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

categorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;