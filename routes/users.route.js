const { Router } = require("express");

const router = Router();

const {
  createUser,
  getUsers,
  addExercise,
  getExerciseLog,
} = require("../controllers/users.controller");

router.post("/", createUser);
router.get("/", getUsers);

router.post("/:_id/exercises", addExercise);

router.get("/:_id/logs", getExerciseLog);

module.exports = router;
