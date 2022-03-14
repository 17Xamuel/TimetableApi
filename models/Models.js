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
});

id(CourseUnitSchema);

const CourseUnit = new mongoose.model("Course_units", CourseUnitSchema);

//user
const UserSchema = mongoose.Schema({
  user_name: {
    type: String,
  },
  user_email: {
    type: String,
  },
  user_password: {
    type: String,
  },
  user_faculty: {
    type: String,
  },
});

id(UserSchema);

const User = new mongoose.model("Users", UserSchema);

//class
const ClassSchema = new mongoose.Schema({
  class_code: {
    type: String,
  },
  faculty: {
    type: String,
  },
  class_course_units: {
    type: String,
  },
});

id(ClassSchema);

const Class = new mongoose.model("Classes", ClassSchema);

//room
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

module.exports = { CourseUnit, User, Class, Room };
