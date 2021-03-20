const db = require('../models');

const Category = db.category;
const HighScoreList = db.highscores;

const create = async (req, res) => {
  const { id } = req.params;
  const { points } = req.body;

  if (!points) {
    return res.status(400).json({
      message: 'Following fields are required: points'
    });
  }

  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      res.status(404).json({
        message: `Couldn't create highscore - Category with id: ${id} was not found`
      });
    }
    else {
      const scoreList = await HighScoreList.findOne({ category: category._id });
      if (scoreList) {
        const i = scoreList.scores.findIndex(score => score.user == req.user.id);
        if (i !== -1 && scoreList.scores[i].points >= points) {
          return res.json({
            message: 'No need to update'
          });
        }
        else if (i !== -1 && scoreList.scores[i].points < points) {
          scoreList.scores[i].points = points;
          await scoreList.save();
          return res.json({
            message: 'Highscore updated'
          });
        }
        else {
          scoreList.scores.push({
            user: req.user.id,
            points
          });
          await scoreList.save();
          return res.json({
            message: 'Highscore added'
          });
        }
      }
      else {
        const newList = new HighScoreList({
          category: category._id,
          scores: [
            {
              user: req.user.id,
              points
            }
          ]
        });
        await newList.save();
        res.json({
          message: 'Highscore added'
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Failed to create new highscore'
    });
  }
}

const findAll = async (req, res) => {
  const { count } = req.query;
  try {
    const data = await HighScoreList.find({})
      .populate('category')
      .populate('scores.user', 'username')
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server failed to retrieve highscores'
    });
  }
}

const findOne = async (req, res) => {
  const { id } = req.params;
  const { count } = req.query;
  try {
    const data = await HighScoreList.findOne({ category: id })
      .populate('category')
      .populate('scores.user', 'username')
    if (data) {
      // Sort scores-array by points (descending)
      data.scores.sort((a, b) => b.points - a.points)
      // Return only specified amount of highscores
      // (e.g. query parameter count=10 will return max 10 highest scores)
      if (count && !isNaN(count)) data.scores.splice(count)
      res.json(data)
    } else {
      return res.status(404).json({
        message: 'Category not found'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server failed to retrieve highscores'
    });
  }
}

module.exports = {
  create,
  findAll,
  findOne
}