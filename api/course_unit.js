const router = require("express").Router();
const { CourseUnit } = require("../models/Models");

//new
router.post("/new", async (req, res) => {
  const course_unit_check = await CourseUnit.findOne({
    course_unit_name: { $eq: req.body.course_unit_name },
  });
  if (course_unit_check) {
    res.send({ data: "Course Unit Exists", status: false });
  } else {
    const course_unit = new CourseUnit({
      course_unit_name: req.body.course_unit_name,
      credit_units: parseInt(req.body.credit_units),
    });
    try {
      const saved_course_unit = await course_unit.save();
      res.send({
        status: true,
        data: "CourseUnit Added Successfully",
        result: saved_course_unit,
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

//all
router.get("/all", async (req, res) => {
  try {
    const course_units = await CourseUnit.find();
    res.send(course_units);
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
    const course_unit = await CourseUnit.findOne({ _id: req.params.id });
    res.send(course_unit);
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
router.delete("/:id", async (req, res) => {
  try {
    const removed_course_unit = await CourseUnit.deleteOne({
      _id: req.params.id,
    });
    res.send({
      status: true,
      data: "deleted",
      result: removed_course_unit,
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

module.exports = router;
