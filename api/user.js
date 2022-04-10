const router = require("express").Router();
const { Teacher, Class, CourseUnit, Room, Dept } = require("../models/Models");
const { TimeTableWeekDay } = require("./timetable");

/**
 *
 * New Teacher
 */
router.post("/teacher/new", async (req, res) => {
  const teacher = new Teacher({
    teacher_name: req.body.teacher_name,
    teacher_pin: req.body.teacher_pin,
    teacher_dept: req.body.teacher_dept,
    teacher_available_days: JSON.stringify(req.body.days_available),
  });
  try {
    const saved_teacher = await teacher.save();
    res.send({
      status: true,
      data: "successful",
      result: saved_teacher,
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

/**
 *
 * Department Sign in
 */
router.post("/admin/login", async (req, res) => {
  try {
    const current_dept = await Dept.findOne({
      $and: [{ dept_number: req.body.no }, { dept_pin: req.body.pin }],
    });
    const depts = await Dept.find();
    current_dept
      ? res.send({ dept: current_dept, status: true })
      : res.send({ status: false, data: "Wrong Details" });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
});

/**
 *
 * register a new department
 */
router.post("/depts/new", async (req, res) => {
  const dept = new Dept({
    dept_number: req.body.number,
    dept_pin: req.body.pin,
    dept_name: req.body.name,
    dept_faculty: req.body.faculty,
  });
  try {
    const saved_dept = await dept.save();
    res.send({
      status: true,
      data: "successful",
      result: saved_dept,
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

/**
 *
 * get all depts
 */

router.get("/depts/all", async (req, res) => {
  try {
    const depts = await Dept.find();
    res.send(depts);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

/**
 *
 * Get teachers
 */

router.get("/teachers/all", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      data: "An Error Occured",
      result: error,
    });
  }
});

/**
 * Get one teacher
 */
router.get("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id });
    res.send(teacher);
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
router.delete("/teacher/delete/:id", async (req, res) => {
  try {
    const removed_teacher = await Teacher.deleteOne({ _id: req.params.id });
    res.send({
      status: true,
      data: "deleted",
      result: removed_teacher,
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
    const teachers = await Teacher.find();
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

router.get("/admin/numbers/:dept", async (req, res) => {
  const config = {};
  try {
    const classes = await Class.find();
    const course_units = await CourseUnit.find();
    const teachers = await Teacher.find();
    const rooms = await Room.find();
    const depts = await Dept.find();

    const dept = depts.find((el) => el.id == req.params.dept);

    if (parseInt(dept.dept_number) == 1) {
      config.classes = classes.length || 0;
      config.course_units = course_units.length || 0;
      config.teachers = teachers.length || 0;
      config.rooms = rooms.length || 0;
    } else {
      config.classes = classes.filter(
        (el) => el.class_dept == req.params.dept
      ).length;
      config.course_units = course_units.filter(
        (el) => el.course_unit_dept == req.params.dept
      ).length;
      config.teachers = teachers.filter(
        (el) => el.teacher_dept == req.params.dept
      ).length;
    }

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
