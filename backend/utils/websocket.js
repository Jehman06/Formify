const socketIo = require('socket.io');

let io; // Initialize a variable to hold the socket.io instance

function initializeWebSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    // WebSocket server logic
    io.on('connection', (socket) => {
        // console.log('Client connected to WebSocket:', socket.id);

        socket.on('disconnect', () => {
            // console.log('Client disconnected from WebSocket:', socket.id);
        });
    });

    return io;
}

function getSocketIoInstance() {
    if (!io) {
        throw new Error('WebSocket has not been initialized');
    }
    return io;
}

module.exports = {
    initializeWebSocket,
    getSocketIoInstance,
};
