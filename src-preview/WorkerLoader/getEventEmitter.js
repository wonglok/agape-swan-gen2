import EventEmitter from 'events'
export const getEventEmitter = () => {
  return new EventEmitter()
}
