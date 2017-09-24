import events from 'events'

const artistEmitter = new events.EventEmitter()

artistEmitter.something = payload => console.log(payload)

export default artistEmitter
