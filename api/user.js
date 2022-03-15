const router = require("express").Router();
const { User, Class, CourseUnit, Room } = require("../models/Models");
const { TimeTableWeekDay } = require("./timetable");

//new user
router.post("/new", async (req, res) => {
  const user_check = await User.findOne({
    user_email: { $eq: req.body.user_email },
  });
  if (!req.body.active) {
    if (user_check) {
      res.send({ data: "User Exists", status: false });
    } else {
      const user = new User({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_faculty: req.body.user_faculty,
      });
      try {
        const saved_user = await user.save();
        res.send({
          status: true,
          data: "successful",
          result: saved_user,
        });
      } catch (error) {
        console.log(error);
        res.send({
          status: false,
          data: "An Error Occured",
          result: error,
        });
      }
    }
  } else {
    try {
      const update_user = await User.updateOne(
        { user_email: req.body.user_email },
        {
          $set: {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
          },
        }
      );
      res.send({
        status: true,
        data: "successful",
        result: update_user,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        data: "An Error Occured",
        result: error,
      });
    }
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const current_user = await User.findOne({
      $and: [{ password: req.body.password }, { email: req.body.email }],
    });
    current_user
      ? res.send({ user: current_user, status: true })
      : res.send({ status: false, data: "Wrong Details" });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

//all
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

//one
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const removed_user = await User.deleteOne({ _id: req.params.id });
    res.send({
      status: true,
      data: "deleted",
      result: removed_user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

router.post("/admin/generate", async (req, res) => {
  const config = {};
  try {
    const classes = await Class.find();
    const course_units = await CourseUnit.find();
    const teachers = await User.find();
    const rooms = await Room.find();
    config.classes = classes || [];
    config.course_units = course_units || [];
    config.teachers = teachers || [];
    config.rooms = rooms || [];

    const tt_weekday = new TimeTableWeekDay(config);

    const tt_try = tt_weekday.timeTableWeekDay;
    res.send({
      status: true,
      data: "Generated",
      result: tt_try,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

router.put("/admin/clear", async (req, res) => {
  res.send("Cleared");
});

router.get("/admin/numbers", async (req, res) => {
  const config = {};
  try {
    const classes = await Class.find();
    const course_units = await CourseUnit.find();
    const teachers = await User.find();
    const rooms = await Room.find();

    config.classes = classes.length || 0;
    config.course_units = course_units.length || 0;
    config.teachers = teachers.length || 0;
    config.rooms = rooms.length || 0;

    res.send({
      status: true,
      data: "success",
      result: config,
    });
  } catch (error) {
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

module.exports = router;
