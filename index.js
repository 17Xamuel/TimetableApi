const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
const PORT = process.env.PORT || 3030;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/user/", require("./api/user"));
app.use("/api/course_unit", require("./api/course_unit"));

conn();

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
