/* eslint-disable no-console */
const express = require('express');
const path = require("path");

const app = express();


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
const port = 8000;
const server = app.listen(process.env.PORT || port, () => { console.log(`app is running on port ${port}`); });
const io = require('socket.io')(server);
io.on("connection", (socket) => {
  console.log("User joined");
  socket.emit('greet', 'Hi user');
  socket.on('confirm', () => { console.log('Received user confirmation') });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});