const User = require("../models/user");
const Exercise = require("../models/exercise");

// POST /api/users
const createUser = async (req, res) => {
  try {
    const username = req.body.username;

    // Check if user is already in the db
    const userFound = await User.findOne({ username: username });
    if (userFound) {
      return res.json(userFound);
    }

    const userObj = {
      username: username,
    };

    // Create new item
    const newUser = new User(userObj);

    // Save the item
    await newUser.save();

    // Send response
    return res.json(newUser);
  } catch (e) {
    return res.json({ error: e.message });
  }
};
// GET /api/users
const getUsers = async (req, res) => {
  try {
    const usersFound = await User.find();
    // Send response
    return res.json(usersFound);
  } catch (e) {
    return res.json({ error: e.message });
  }
};

// POST /api/users/:_id/exercises
const addExercise = async (req, res) => {
  try {
    const userId = req.body[":_id"];
    let { description, duration, date } = req.body;

    // Check if user is already in the db
    const userFound = await User.findById(userId);
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Check date
    if (!date) {
      date = new Date();
    } else {
      date = new Date(date);
    }

    const exerciseObj = {
      username: userFound.username,
      description,
      duration,
      date: date.toDateString(),
      userId: userId,
    };
    //Create exercise
    await Exercise.create(exerciseObj);
    // Send response
    return res.json({
      username: userFound.username,
      description,
      duration,
      date: date.toDateString(),
      _id: userId,
    });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

const getExerciseLog = async (req, res) => {
  let { from, to, limit } = req.query;
  const userId = req.params._id;

  // Check if user is already in the db
  const userFound = await User.findById(userId);
  if (!userFound) {
    return res.json({ message: "User not found" });
  }

  // Filter
  let filter = { userId };
  let dateFilter = {};
  if (from) {
    dateFilter["$gte"] = new Date(from);
  }
  if (to) {
    dateFilter["$lte"] = new Date(to);
  }
  if (from || to) {
    filter.date = dateFilter;
  }

  if (!limit) {
    limit = 100;
  }

  // Get exercises
  const exercises = (await Exercise.find(filter).limit(limit)).map((el) => {
    return {
      description: el.description,
      duration: el.duration,
      date: el.date.toDateString(),
    };
  });
  try {
    return res.json({
      username: userFound.username,
      count: 1,
      log: exercises,
    });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  addExercise: addExercise,
  getExerciseLog: getExerciseLog,
};
