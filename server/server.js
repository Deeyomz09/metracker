const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/db");

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
