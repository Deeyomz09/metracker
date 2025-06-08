const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/income", require("./routes/api/income"));
app.use("/api/expense", require("./routes/api/expense"));
app.use("/api/dashboard", require("./routes/api/dashboard"));

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
