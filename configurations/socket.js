const User = require('../models/User');

module.exports = socket => {
  socket.on('connection', socket => {
    console.log('User has connect');
    socket.on('disconnect', _ => {
      console.log('User disconnected');
      socket.emit('user-disconnect');
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
  });
};
