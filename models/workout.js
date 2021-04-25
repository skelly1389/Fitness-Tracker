const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkOutSchema = new Schema({
  day: Date,
  exercises: [],
},
{
  toJSON: {
      virtuals: true
  }
}
);

WorkOutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkOutSchema);

module.exports = Workout;