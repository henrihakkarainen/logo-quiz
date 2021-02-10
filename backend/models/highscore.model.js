const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  points: {
    type: Number,
    required: true,
    min: 0
  }
});

scoreSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

const Score = mongoose.model('Score', scoreSchema);

const highscoreSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Score'
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

const TopScoreList = mongoose.model('TopScoreList', highscoreSchema);

module.exports = {
  Score,
  TopScoreList
};