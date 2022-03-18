const router = require("express").Router();
const { Class } = require("../models/Models");

//new
router.post("/new", async (req, res) => {
  const class_check = await Class.findOne({
    class_code: { $eq: req.body.class_code },
  });
  if (class_check) {
    res.send({ data: "Class Exists", status: false });
  } else {
    const new_class = new Class({
      class_code: req.body.class_code,
      faculty: req.body.faculty,
      class_course_units: JSON.stringify(req.body.class_course_units),
    });
    try {
      const saved_class = await new_class.save();
      res.send({
        status: true,
        data: "Class Added Successfully",
        result: saved_class,
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
    const classes = await Class.find();
    res.send(classes);
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
    const one_class = await Class.findOne({ _id: req.params.id });
    res.send(one_class);
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
    const removed_class = await Class.deleteOne({ _id: req.params.id });
    res.send({
      status: true,
      data: "deleted",
      result: removed_class,
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
