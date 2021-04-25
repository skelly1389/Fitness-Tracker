const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkOutSchema = new Schema({
  day: Date,
  exercises: [],
});

const Workout = mongoose.model("Workout", WorkOutSchema);

module.exports = Workout;