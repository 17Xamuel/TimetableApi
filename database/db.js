const mongoose = require("mongoose");
require("dotenv/config");

const conn = () => {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected....");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = conn;
