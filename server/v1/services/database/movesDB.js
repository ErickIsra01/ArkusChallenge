const movesModel = require("../../models/movesModel");

async function createMove(data) {
  const newMove = new movesModel(data);
  const addedMove = await newMove.save();
  return addedMove;
};

async function findById(id) {
  const move = await movesModel.findById(id);
  return move;
}

async function updateMove(filter, data) {
  const move = await movesModel.findOneAndUpdate(filter, data);
  return move;
}

module.exports = { createMove, findById, updateMove }