const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");

const Comment = require("../models/comment");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(__dirname, "../public/images/uploads/")); //--> path // ${req.user._id}
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}${file.originalname}`;
//     cb(null, fileName);
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  // step 1  --> step 2--> create blog view
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  // after comments
  const comments = await Comment.find ({blogId: req.params.id}).populate ("createdBy");


  // console.log (blog);   // populate is giving the complete user with blog details also
  return res.render("blog", {
    // step 3 --> render the blog page
    user: req.user, // req.user isliye likhe ki navbar me hame Add blog icon dikhe (similary as we did previously)
    blog,
    
    comments,// ye blog object hum blog view me istemal karre particular things display kar
  });
});

// comment
router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("CoverImage"), async (req, res) => {
  // console.log (req.body);
  // console.log (req.file);
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    // coverImageURL: `/uploads/${req.file.filename}`,
    coverImageURL: `/images/uploads/${req.file.filename}`,

  });

  return res.redirect(`/blog/${blog._id}`); // as we dont have /blog/blog_id route --> create this route
});

module.exports = router;
