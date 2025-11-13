let io;
module.exports.initSocket = (server) => {
  const { Server } = require('socket.io');
  io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', socket => {
    console.log('socket connected', socket.id);
    socket.on('join', room => socket.join(room));
    socket.on('leave', room => socket.leave(room));
  });
  console.log('Socket initialized');
};
module.exports.emit = (room, event, payload) => { if (!io) return; io.to(room).emit(event, payload); };
