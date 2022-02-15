const router = require("express").Router();
const { Room } = require("../models/Models");

//new
router.post("/new", async (req, res) => {
  const room_check = await Room.findOne({
    room_name: { $eq: req.body.room_name },
  });
  if (room_check) {
    res.send({ data: "Room Exists", status: false });
  } else {
    const room = new Room({
      room_name: req.body.room_name,
      room_type: req.body.room_type,
      room_faculty: req.body.room_faculty,
    });
    try {
      const saved_room = await room.save();
      res.send({
        status: true,
        data: "Room Added Successfully",
        result: saved_room,
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
    const rooms = await Room.find();
    res.send(rooms);
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
    const room = await Room.findOne({ _id: req.params.id });
    res.send(room);
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
    const removed_room = await Room.deleteOne({ _id: req.body.req.params.id });
    res.send({
      status: true,
      data: "deleted",
      result: removed_room,
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
