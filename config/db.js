const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = async () => 
{
    conn = await mongoose.connect("mongodb://localhost:27017/mern_demo", {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  });
  if(conn)
    console.log(`Server connected ${conn.connection.host}`)
  else
    console.log("Server Not Connected")  
};

module.exports = connectDB;
