const mongoose = require("mongoose");

//_id to id
const id = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
};

//courseunit
const CourseUnitSchema = mongoose.Schema({
  course_unit_name: {
    type: String,
  },
  credit_units: {
    type: Number,
  },
});

id(CourseUnitSchema);

const CourseUnit = new mongoose.model("course_units", CourseUnitSchema);

module.exports = { CourseUnit };
