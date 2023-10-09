type EventListener<T = any> = (...args: T[]) => void;

class EventEmitter {
  private events: { [key: string]: EventListener[] } = {};
  private maxListeners: number;

  constructor(maxListeners: number = 10) {
    this.maxListeners = maxListeners;
  }

  on<T = any>(event: string, listener: EventListener<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    // Check for max listeners
    if (this.events[event].length >= this.maxListeners) {
      console.warn(`Possible EventEmitter memory leak detected. ${this.events[event].length} ${event} listeners added. Use emitter.setMaxListeners() to increase limit.`);
    }

    this.events[event].push(listener);
  }

  emit<T = any>(event: string, ...args: T[]): void {
    // Emit for the specific event
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
    
    // Emit for wildcard listeners
    if (this.events["*"]) {
      this.events["*"].forEach(listener => listener(event, ...args));
    }
  }

  off(event: string, listener: EventListener): void {
    if (!this.events[event]) {
      throw new Error(`Cannot remove listener. Event "${event}" doesn't exist.`);
    }

    const index = this.events[event].findIndex(l => l === listener);
    if (index === -1) {
      throw new Error(`Cannot remove listener. It doesn't exist for event "${event}".`);
    }

    this.events[event].splice(index, 1);
  }

  removeAllListeners(event?: string): void {
    if (event) {
      if (!this.events[event]) {
        throw new Error(`Cannot remove listeners. Event "${event}" doesn't exist.`);
      }
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  setMaxListeners(count: number): void {
    this.maxListeners = count;
  }
}

export default EventEmitter;