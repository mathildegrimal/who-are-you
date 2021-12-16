/* eslint-disable no-console */
const express = require('express');
const path = require("path");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const { Server } = require("socket.io");

app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
app.get('/oui', (req, res, next) => res.send('oui'));
// eslint-disable-next-line no-unused-vars
app.get('/test', (req, res, next) => res.send('test'));
// eslint-disable-next-line no-unused-vars
app.get('/test2/:id', (req, res, next) => res.send(`test2${req.params.id}`));
app.post("/questions", (req, res) => res.send(req.body));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//route pour fetcher la config

const port = 8000;
const server = app.listen(process.env.PORT || port, () => { console.log(`app is running on port ${port}`); });



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join room", (roomName) => {
    socket.join(roomName);
  })
  socket.on("message", ({ roomName, msg }) => {
    console.log(roomName, msg);
    io.to(roomName).emit("chat message", msg);
  });
});
