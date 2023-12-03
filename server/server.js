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

app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/blog-actions", blogActionsRoute);

const port = process.env.PORT;
const server = require("http").createServer(app);

// socket io
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

console.log("The origin :: server.js - " , process.env.ORIGIN)


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
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(process.cwd() +'/opt/render/project/src/uploads'));



// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
