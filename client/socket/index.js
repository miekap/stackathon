import io from 'socket.io-client'
import fanEmitter from './fanEmitter'
import artistEmitter from './artistEmitter'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket connection made')
})

fanEmitter.on('musicChosen', (f,n,m) => {
  socket.emit('serverGetsChoices', f,n,m)
});

socket.on('artistGetsChoices', (f,n,m) => {
  artistEmitter.emit('heresFanChoices',f,n,m)
})

artistEmitter.on('authDownload', (f,n,m) => {
  socket.emit('fanGetsMusic', f,n,m);
});

export default socket
