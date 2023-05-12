const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    socket.on('join-room', (name) => {
        console.log(`${name} joined the room`);
    })

    socket.on('chat-room', (data) => {
        console.log(data)
        io.emit('send-chat-to-client', data)
    })

    socket.on('disconnect', (name) => {
        console.log(`${name} disconnected`);
    });
})

server.listen(8000, () => {
    console.log('listening on *:8000')
})