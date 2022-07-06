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
  course_unit_teacher: {
    type: String,
  },
  course_unit_room: {
    type: String,
  },
  course_unit_codes: {
    type: String,
  },
  course_unit_semester: {
    type: String,
  },
  course_unit_dept: {
    type: String,
  },
});

id(CourseUnitSchema);

const CourseUnit = new mongoose.model("Course_units", CourseUnitSchema);

//user
const TeacherSchema = mongoose.Schema({
  teacher_name: {
    type: String,
  },
  teacher_pin: {
    type: String,
  },
  teacher_dept: {
    type: String,
  },
  teacher_available_days: {
    type: String,
  },
});

id(TeacherSchema);

const Teacher = new mongoose.model("Teachers", TeacherSchema);

/**
 *
 * DepartmentSchema
 */
const DeptSchema = mongoose.Schema({
  dept_number: {
    type: String,
  },
  dept_name: {
    type: String,
  },
  dept_pin: {
    type: String,
  },
  dept_faculty: {
    type: String,
  },
});

id(DeptSchema);

const Dept = new mongoose.model("Dept", DeptSchema);

//class
const ClassSchema = new mongoose.Schema({
  class_code: {
    type: String,
  },
  class_course_units: {
    type: String,
  },
  class_dept: {
    type: String,
  },
});

id(ClassSchema);

const Class = new mongoose.model("Classes", ClassSchema);

/**
 *
 * Rooms Schema
 */
const RoomSchema = new mongoose.Schema({
  room_name: {
    type: String,
  },
  room_type: {
    type: String,
  },
  room_faculty: {
    type: String,
  },
});

id(RoomSchema);

const Room = new mongoose.model("Rooms", RoomSchema);

/**
 *
 *Generated Timetable
 */
const Tt = new mongoose.Schema({
  tt: {
    type: String,
  },
  missed: {
    type: String,
  },
  academic_year: {
    type: String,
  },
  semester: {
    type: String,
  },
});

id(Tt);

const Timetable = new mongoose.model("Timetable", Tt);

module.exports = { CourseUnit, Teacher, Class, Room, Dept, Timetable };
