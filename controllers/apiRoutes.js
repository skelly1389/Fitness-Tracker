const router = require("express").Router();
const db = require("../models");

// router.get("/api/workouts", ({ body }, res) => {
//   db.Workout.aggregate([
//       {
//           $addFields: {
//               totalDuration: { $sum: "$exercises.duration" }
//           }
//       }
//   ])
//       .then(dbWorkout => {
//           res.json(dbWorkout);
//       })
//       .catch(err => {
//           res.status(400).json(err);
//       });
// });

router.get("/workouts", (req, res) => {
  db.Workout.find().sort({ day: -1})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", ({ body }, res) => {
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

router.post("/api/workouts", (req, res) => {
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

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
