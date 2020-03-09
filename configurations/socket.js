const User = require('../models/User');

module.exports = io => {
  io.on('connection', socket => {
    console.log('User has connect');
    socket.on('disconnect', _ => {
      console.log('User disconnected');
      socket.emit('user-disconnect');
      socket.disconnect();
    });

    socket.on('user-login', uid => {
      console.log('user-login : ', uid);
      User.findById(uid).exec((err, user) => {
        user.isOnline = true;
        user.save();
      });
    });

    socket.on('user-setOffline', uid => {
      console.log('user-offline : ', uid);
      User.findById(uid).exec((err, user) => {
        user.isOnline = false;
        user.save();
      });
    });

    socket.on('user-join-room', ({ roomId }) => {
      console.log(`A user joined chat-${roomId}`);
      socket.join(`chat-${roomId}`);
    });

    socket.on('user-send-message', conversation => {
      socket
        .to(`chat-${conversation._id}`)
        .emit('receive-message', conversation);
    });
  });
};
