import Cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Initializing the cors middleware
const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST']
});

const ioHandler = (req, res) => {
  console.log('req.method', req.method);
  // Run the cors middleware
  cors(req, res, () => {
    if (req.method !== 'GET') {
      res.status(405).end('Method Not Allowed');
      return;
    }

    const server = createServer((req, res) => {
      res.writeHead(200);
      res.end('Hello, world!');
    });

    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        io.emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    res.end();
  });
};

export default ioHandler;
