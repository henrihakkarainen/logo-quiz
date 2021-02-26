const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  scores: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      points: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ]
});

highscoreSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

const HighScoreList = mongoose.model('HighScoreList', highscoreSchema);

module.exports = HighScoreList;