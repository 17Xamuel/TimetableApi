const router = require("express").Router();
const { User } = require("../models/Models");

//new user
router.post("/new", async (req, res) => {
  const user_check = await User.findOne({ email: { $eq: req.body.email } });
  if (!req.body.active) {
    if (user_check) {
      res.send({ data: "User Exists", status: false });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
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
        { email: req.body.email },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
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

module.exports = router;
