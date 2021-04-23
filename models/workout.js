const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkOutSchema = new Schema({
  
});

const WorkOut = mongoose.model("Workout", WorkOutSchema);

module.exports = WorkOut;