const router = require("express").Router();
const db = require("../models/");

router.get("/api/workouts", async (req, res) => {
  try {
    const lastWorkout = await db.Workout.aggregate([
    { $sort: 
      { 
        day: 1 
      }
    },
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }
  ]) 
  res.status(200).send(lastWorkout);
  } catch (err) {
  res.status(500).json(err);
  }   
});

// .then(dbExercise => {
//   res.send(dbExercise);
// })
// .catch(err => {
//   res.status(500).json(err);
// });






//Doubleback to see if this route works
router.put("/api/workouts/:id",  async (req, res) => {
   try {
     const updatedWorkout = await db.Workout.updateOne({_id: req.params.id},
    {
      $push: {
        exercises: req.body
      }
    }
  )
  res.status(200).send(updatedWorkout);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/api/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.status(200).send(newWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/api/workouts/range', async (req, res) => {
  const rangeData = await db.Workout.aggregate([{
      $addFields: {
          totalDuration: { $sum : "$exercises.duration"}
      } 
  }])
  const lastSeven = rangeData.slice(-7);

  res.json(lastSeven);
});


module.exports = router;