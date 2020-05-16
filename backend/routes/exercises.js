const router = require("express").Router();
let Exercise = require("../models/exercise.model");
let User = require("../models/user.model");
const transporter = require("../transporter");
let gsfcnasa = require("../nasa");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/mail").get((req, res) => {
  Exercise.find().then((exercises) => {
    exercises.map((ex) => {
      if (
        ex.date.getDate() == new Date().getDate() &&
        ex.date.getFullYear() == new Date().getFullYear() &&
        ex.date.getMonth() == new Date().getMonth()
      ) {
        User.findOne({ username: ex.username })
          .then((user) => {
            transporter.sendMail({
              from: '"NOTIFIER 👻" <dmytrorysan@gmail.com>',
              to: user.email,
              subject: "Notification ✔",
              text: `-1-1-1-1-1--1--1-1-1--1-1--1-1--`,
              html: `<b>Dont forget</b>
           <p>Today ur goal is to ${ex.description} during ${ex.duration} minutes<p>
            ${gsfcnasa.message}`,
            });
          })
          .catch((err) => res.status(400).json("Error: " + err.message));
        console.log("Message sent");
      }
    });
  });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
