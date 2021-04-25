const router = require("express").Router();
const db = require("../models");

router.get("/workouts", ({ body }, res) => {
  db.Workout.aggregate([
      {
          $addFields: {
              totalDuration: { $sum: "$exercises.duration" }
          }
      }
  ])
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

// router.get("/workouts", (req, res) => {
//   db.Workout.find()
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

router.get("/workouts/range", ({ body }, res) => {
  db.Workout.aggregate([
      {
          $addFields: {
              totalDuration: { $sum: "$exercises.duration" },
              totalWeight: { $sum: "$exercises.weight" },
              totalSets: { $sum: "$exercises.sets" },
              totalReps: { $sum: "$exercises.reps" },
              totalDistance: { $sum: "$exercises.distance" }
          }
      }
  ])
  .then(dbWorkout => {
      res.json(dbWorkout);
  })
  .catch(err => {
      res.status(400).json(err);
  });
})

router.post("/workouts", (req, res) => {
  db.Workout.create({
      day: Date.now()
  })
      .then(newWorkout => {
          console.log("New Workout: ", newWorkout);
          res.json(newWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

router.put("/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
