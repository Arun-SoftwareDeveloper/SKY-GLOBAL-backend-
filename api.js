const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const ConfigDB = require("./ConfigDB");
const app = express();
const UserRoutes = require("./Routes/UserRoutes");
const ProtectedRoutes = require("./Routes/ProtectedRoutes");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
ConfigDB();

app.use("/auth", UserRoutes);
app.use("/protected", ProtectedRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
