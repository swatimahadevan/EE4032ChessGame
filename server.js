const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for the Express app
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.json());
// In-memory queue to hold users
const userQueue = [];

// API endpoint to join the queue
app.post('/api/joinQueue', (req, res) => {
  // For simplicity, we'll use a timestamp as a unique user identifier
  const user = 'User_' + Date.now();

  // Add the user to the queue
  userQueue.push(user);

  if (userQueue.length >= 2) {
    // Match the first two users and send a response
    const user1 = userQueue.shift();
    const user2 = userQueue.shift();
    res.status(200).json({ message: `Matched: ${user1} and ${user2}` });
  } else {
    res.status(200).json({ message: 'Joined the queue. Waiting for a match.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
