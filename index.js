/* eslint-disable no-console */
const express = require('express');
const path = require("path");
const app = express();
const { persons } = require('./config/persons');
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
app.get('/api/persons', (req, res, next) => res.send(persons));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//route pour fetcher la config

const port = 8000;
const server = app.listen(process.env.PORT || port, () => { console.log(`app is running on port ${port}`); });

const getRandomPerson = () => {
  return persons[Math.floor(Math.random() * 20)];
}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});



let game =[]
io.on("connection", (socket) => {
  socket.on("join room", ({ room, name }) => {
    socket.join(room);
    let config = { playerName: name, person: getRandomPerson() };
    game.push({ playerName: name, person: getRandomPerson() });
    socket.emit(`config-${socket.id}`, config)
  })
  socket.on("message", (data) => {
    io.to(data.roomName).emit("chat message", data);
  });
});
