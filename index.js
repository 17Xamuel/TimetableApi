const express = require("express");
const cors = require("cors");
const conn = require("./database/db");
const PORT = process.env.PORT || 3030;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

conn();

app.listen(PORT, () => {
  console.log(`Server Listening on PORT ${PORT}`);
});
