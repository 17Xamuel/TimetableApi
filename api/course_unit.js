const router = require("express").Router();
const { CourseUnit } = require("../models/Models");

//new courseunit
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

module.exports = router;
