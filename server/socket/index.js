module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} has connected`)

    socket.on('serverGetsChoices', (f,n,m)=>{
      socket.broadcast.emit('artistGetsChoices', f,n,m);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} has disconnected`)
    })
  })
}
