const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
const PORT = process.env.PORT || 3030;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users/", require("./api/user"));
app.use("/api/rooms/", require("./api/room"));
app.use("/api/class/", require("./api/class"));
app.use("/api/course-units/", require("./api/course_unit"));

conn();

// app.get("/", (req, res) => {
//   res.send("Home");
// });

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
