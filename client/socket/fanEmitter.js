import events from 'events'

const fanEmitter = new events.EventEmitter()

fanEmitter.something = payload => console.log(payload)

export default fanEmitter
