const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const path = require("path");
// configuration of dot env file .........................................................

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const { mongooseConnection } = require("./db/mongooseConnection");

// database connection here ............................................................
mongooseConnection();
// database connection here ............................................................
app.use(cookie());
app.use(cors());

// non production code---------------------------------------------

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
//   })
// );
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SEC,
});

// userRouter end point here .......................................................

app.use("/api/ppg", UserRoutes);
app.use("/api/ppg", PostRoutes);

// for production
app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("index is running");
// });
app.listen(process.env.PORT || 4000, () => {
  console.log("port is running on 4000");
});
