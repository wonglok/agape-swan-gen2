export const getEventEmitter = () => {
  return {
    events: {}, // dictionary with our events
    on(event, listener) {
      // add event listeners
      if (!this.events[event]) {
        this.events[event] = { listeners: [] }
      }
      this.events[event].listeners.push(listener)
    },
    offAllOf(event) {
      // remove listeners
      delete this.events[event]
    },
    emit(name, ...payload) {
      // trigger events
      if (!this.events[name]) {
        this.events[name] = { listeners: [] }
      }
      for (const listener of this.events[name].listeners) {
        listener.apply(this, payload)
      }
    },
    destroy() {
      // remove all listeners
      this.events = {}
    },
  }
}
