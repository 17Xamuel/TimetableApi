const router = require("express").Router();
const { User } = require("../models/Models");

//new user
router.post("/new", async (req, res) => {
  const user_check = await User.findOne({ email: { $eq: req.body.email } });
  if (user_check) {
    res.send({ data: "User Exists", status: false });
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const saved_user = await user.save();
      res.send({
        status: true,
        data: "User Added Successfully",
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
});

module.exports = router;
