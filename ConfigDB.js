const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DBURL = process.env.DBURL;

const mongooseConnection = async () => {
  try {
    const connection = await mongoose.connect(DBURL);
    console.log("mongoDb connected Successfully");
  } catch (error) {
    console.log("Error in connecting mongoDB" + " " + error);
  }
};

mongooseConnection();

module.exports = mongooseConnection;
