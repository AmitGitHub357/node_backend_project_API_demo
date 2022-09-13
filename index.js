const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/project", projectRoutes);

app.listen(port, () => console.log(`Server Started on port ${port}`));
