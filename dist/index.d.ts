type EventListener<T = any> = (...args: T[]) => void;
declare class EventEmitter {
    private events;
    private maxListeners;
    constructor(maxListeners?: number);
    on<T = any>(event: string, listener: EventListener<T>): void;
    emit<T = any>(event: string, ...args: T[]): void;
    off(event: string, listener: EventListener): void;
    removeAllListeners(event?: string): void;
    setMaxListeners(count: number): void;
}
export default EventEmitter;
