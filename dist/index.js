"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor(maxListeners = 10) {
        this.events = {};
        this.maxListeners = maxListeners;
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        // Check for max listeners
        if (this.events[event].length >= this.maxListeners) {
            console.warn(`Possible EventEmitter memory leak detected. ${this.events[event].length} ${event} listeners added. Use emitter.setMaxListeners() to increase limit.`);
        }
        this.events[event].push(listener);
    }
    emit(event, ...args) {
        // Emit for the specific event
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
        // Emit for wildcard listeners
        if (this.events["*"]) {
            this.events["*"].forEach(listener => listener(event, ...args));
        }
    }
    off(event, listener) {
        if (!this.events[event]) {
            throw new Error(`Cannot remove listener. Event "${event}" doesn't exist.`);
        }
        const index = this.events[event].findIndex(l => l === listener);
        if (index === -1) {
            throw new Error(`Cannot remove listener. It doesn't exist for event "${event}".`);
        }
        this.events[event].splice(index, 1);
    }
    removeAllListeners(event) {
        if (event) {
            if (!this.events[event]) {
                throw new Error(`Cannot remove listeners. Event "${event}" doesn't exist.`);
            }
            delete this.events[event];
        }
        else {
            this.events = {};
        }
    }
    setMaxListeners(count) {
        this.maxListeners = count;
    }
}
exports.default = EventEmitter;
