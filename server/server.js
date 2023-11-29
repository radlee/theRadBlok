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
__dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/blogs", blogsRoute);
app.use("/api/blog-actions", blogActionsRoute);

const port = process.env.PORT || 5000;
const server = require("http").createServer(app);

// socket io
const io = require("socket.io")(server, {
  cors: {
    origin: "https://radblok.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


//Cross Origin Handle Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if( req.method === 'OPTIONS'){
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
You 
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)


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

// Serve static files in development
// if (process.env.NODE_ENV === 'development') {
//   app.use(express.static('uploads')); // Adjust the path accordingly
// }

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
