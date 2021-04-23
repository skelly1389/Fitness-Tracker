const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkOutSchema = new Schema({
  day: Date,
  exercises: [
    {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
      }
  ]
});

const WorkOut = mongoose.model("Workout", WorkOutSchema);

module.exports = WorkOut;