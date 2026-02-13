const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
