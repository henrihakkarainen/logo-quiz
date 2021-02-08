const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  alias: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
    unique: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (val) => {
        if (!val || !Array.isArray(val)) return false;
        if (val.length < 6) return false;

        const uniqueOptions = [];
        val.forEach((current) => {
          if (uniqueOptions.includes(current)) return;
          uniqueOptions.push(current);
        });

        if (uniqueOptions.length !== val.length) return false;
      },
      message: 'Options must have at least 6 unique options.'
    }
  },
  correct: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  difficulty: {
    type: Number,
    required: true,
    validate: {
      validator: (num) => {
        return num >= 1 && num <= 10;
      },
      message: 'Difficulty must be between 1-10.'
    }
  },
  categoryID: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;