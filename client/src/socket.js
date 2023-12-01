// socket.js

import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Adjust the port accordingly
// const socket = io("https://radblok.onrender.com"); // Adjust the port accordingly

export default socket;
