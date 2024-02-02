require('dotenv').config();
require('./db');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const postRouter = require('./routers/post');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials: true,
  },
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/post', postRouter);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newPost', (postData) => {
    
    io.emit('newPost', postData);
  });
  socket.on('updatePost', (postData) => {
    
    io.emit('updatePost', postData);
  });
  socket.on('deletePost', (postId) => {
    
    io.emit('deletePost', postId);
  });
});

const PORT = process.env.PORT || 4545;

server.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
