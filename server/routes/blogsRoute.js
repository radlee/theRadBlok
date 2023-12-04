const express = require('express');
const router = require("express").Router();
const Blog = require("../models/blogsModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Like = require("../models/likesModel");
const Comment = require("../models/commentsModel");
const Share = require("../models/sharesModel");
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const multer = require("multer");
const cors = require('cors');
const app = express();

const path = require("path");
const server = require("http").createServer(app);

const imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`)
  }
})
const isImage = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb( new Error("Only images are allowed") )
  }
}
const upload = multer({
  storage: imgconfig, 
  fileFilter: isImage
});

// socket io
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

console.log("The origin :: BlogsRoute.js - " , process.env.ORIGIN)



// add new blog
router.post("/add-blog", upload.single('photo'), authMiddleware, async (req, res) => {
   const upload = await cloudinary.uploader.upload(path.join(__dirname, 'uploads', req.file.filename));

   console.log("Upload == :", upload)
  try {
    const newBlog = new Blog({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      name: req.body.name,
      imgpath: upload.secure_url,
      canShare: req.body.canShare,
      canComment: req.body.canComment,
      canLike: req.body.canLike,
    });
    console.log(" Before Save DATA AFtre SAVE -  ", newBlog)
    await newBlog.save();
    console.log(" After Save DATA AFtre SAVE -  ", newBlog)
    res.send({
      message: "Blog added successfully",
      data: newBlog,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all blogs
router.get("/get-all-blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user").sort({ createdAt: -1 });
  
    res.send({
      message: "Blogs fetched successfully",
      data: blogs,
      success: true,
    });
 
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }

  
});

// get blog by id
router.get("/get-blog-by-id/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    res.send({
      message: "Blog fetched successfully",
      data: blog,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// update blog
router.put("/update-blog/:id", authMiddleware, async (req, res) => {
  try {
    // Extract text fields from req.body
    const { title, description, content, file, canShare, canComment, canLike } = req.body;

    // Construct the updated blog object
    const updatedBlog = {
      title,
      description,
      content,
      canShare: canShare === 'true', // Convert string to boolean
      canComment: canComment === 'true', // Convert string to boolean
      canLike: canLike === 'true', // Convert string to boolean
      file: req.file.filename, // Assuming the filename is the correct field
    };

    // Perform the update
    await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
    
    res.send({
      message: "Blog updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});


// delete blog
router.delete("/delete-blog/:id", authMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all blogs by user
router.get("/get-all-blogs-by-user", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.body.userId }).sort({
      createdAt: -1,
    });
    res.send({
      message: "Blogs fetched successfully",
      data: blogs,
      success: true,
    });
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    });
  }
});

// get all blogs by liked by user
router.get(
  "/get-all-blogs-by-liked-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const likes = await Like.find({ user: req.body.userId }).populate({
        path: "blog",
        populate: {
          path: "user",
        },
      });
      res.send({
        message: "Blogs fetched successfully",
        data: likes,
        success: true,
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  }
);

// get all blogs by commented by user
router.get(
  "/get-all-blogs-by-commented-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const blogs = await Comment.find({
        user: req.body.userId,
      }).populate({
        path: "blog",
        populate: {
          path: "user",
        },
      });
      res.send({
        message: "Blogs fetched successfully",
        data: blogs,
        success: true,
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  }
);

// get all blogs by shared by user
router.get(
  "/get-all-blogs-by-shared-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const blogs = await Share.find({
        sender: req.body.userId,
      })
        .populate({
          path: "blog",
          populate: {
            path: "user",
          },
        })
        .populate("receiver")
        .sort({ createdAt: -1 });
      res.send({
        message: "Blogs fetched successfully",
        data: blogs,
        success: true,
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  }
);

// get all blogs by shared to user
router.get(
  "/get-all-blogs-by-shared-to-user",
  authMiddleware,
  async (req, res) => {
    try {
      const blogs = await Share.find({
        receiver: req.body.userId,
      })
        .populate({
          path: "blog",
          populate: {
            path: "user",
          },
        })
        .populate("sender")
        .sort({ createdAt: -1 });
      res.send({
        message: "Blogs fetched successfully",
        data: blogs,
        success: true,
      });
    } catch (error) {
      res.send({
        error: error.message,
        success: false,
      });
    }
  }
);


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



module.exports = router;
