// socket.js

import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the port accordingly

export default socket;
