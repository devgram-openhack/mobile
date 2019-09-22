const EventEmitter = {
  events: {},

  dispatch(event, data) {
    if (this.events[event]) {
      for (const callback of this.events[event]) {
        callback(data);
      }
    }
  },

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return {
      unsubscribe: () => {
        if (this.events[event]) {
          this.events[event] = this.events[event].filter(subscribedCallback => subscribedCallback !== callback);
        }
      },
    };
  },
};

export { EventEmitter };