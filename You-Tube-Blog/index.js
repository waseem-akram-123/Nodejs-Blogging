require ("dotenv").config();

console.log("MongoDB URL:", process.env.MONGODB_URL);


const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middlewares/authentication");

const PORT = process.env.PORT || 8000;
// const PORT = 8000;
const mongoose = require("mongoose");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const path = require("path");

// coonection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb is connected!");
  })
  .catch((err) => {
    console.log("error occurred", err);
  });

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/images/uploads"))
);

app.use(checkForAuthCookie("token"));

// routes
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}); //.sort ("createdAt", -1);
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// set view path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
