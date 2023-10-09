# EventEmitter

A simple yet powerful event management system for TypeScript and JavaScript. Manage and emit events with ease while maintaining type safety.

## Features

- **Type Safety:** Written in TypeScript and supports type-safety out of the box.
- **Wildcard Events:** Listen to all emitted events using wildcards.
- **Max Listeners Warning:** Prevents memory leaks by warning about potential excessive listeners.
- **Multiple Instances:** Create multiple event emitters for different parts of your application.

## Installation

Using npm:

```
npm install react-event-simple-emitter
```

Using yarn:

```
yarn add react-event-simple-emitter
```

## Usage

### Importing

```
import EventEmitter from 'react-event-simple-emitter';
```

### Creating an instance

By default, each EventEmitter instance will have a max listeners limit of 10.

```
const emitter = new EventEmitter();
```

Or with a custom limit:

```
const customEmitter = new EventEmitter(20);
```

### Subscribing to an event

```
emitter.on('sayHello', (name: string) => {
  console.log(`Hello, ${name}!`);
});
```

### Emitting an event

```
emitter.emit('sayHello', 'Alice');  // Logs: Hello, Alice!
```

### Unsubscribing from an event

```
const myListener = (name: string) => {
  console.log(`Goodbye, ${name}!`);
};

emitter.on('sayGoodbye', myListener);
emitter.off('sayGoodbye', myListener);
```

### Wildcard Events

Listen to all events:

```
emitter.on('*', (event, ...args) => {
  console.log(`Event "${event}" was emitted with arguments:`, args);
});
```

### Set Max Listeners

To change the max listeners at runtime:

```
emitter.setMaxListeners(50);
```

### Remove All Listeners

Remove all listeners for a specific event:

```
emitter.removeAllListeners('eventName');
```

Or remove all listeners for all events:

```
emitter.removeAllListeners();
```

## API Reference

- **`on(event: string, listener: Function)`**: Registers a listener for an event.
- **`emit(event: string, ...args: any[])`**: Emit an event with or without arguments.
- **`off(event: string, listener: Function)`**: Unregisters a listener from an event.
- **`removeAllListeners(event?: string)`**: Removes all listeners for a specific event, or for all events if no event name is provided.
- **`setMaxListeners(count: number)`**: Sets the maximum number of listeners that can be added to each event.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/sinjiprasetio/react-event-emitter/issues) or submit PRs.

## License

[MIT](LICENSE.md) © [Sinji Prasetio]
