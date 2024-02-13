const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const app = express();
const cors = require('cors');
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const blogsRoute = require("./routes/blogsRoute");
const blogActionsRoute = require("./routes/blogActionsRoute");

const path = require("path");

// Add CSP middleware here
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com");
  next();
});

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/blog-actions", blogActionsRoute);

// Add this after all other routes
// render deployment
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

const port = process.env.PORT || 4001;
const server = require("http").createServer(app);

// socket io
const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://radblok.onrender.com"
        : "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // join room
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  // listen for new notification
  socket.on("newNotification", (notification) => {
    socket.to(notification.userId).emit("newNotification", notification);
  });
});

__dirname = path.resolve();

// render deployment
const buildPath = path.join(__dirname, "build");



server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
