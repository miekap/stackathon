module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connection to server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected`)
    })
  })
}
