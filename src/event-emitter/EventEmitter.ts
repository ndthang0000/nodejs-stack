class EventEmitter {
    events: { [key: string]: Function[] } = {}
    on(event: string, cb: Function) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)
    }
    emit(event: string, ...args: any[]) {
        if (this.events[event]) {
            this.events[event].forEach((cb) => cb(...args))
        }
    }
    off(event: string, cb: Function) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((fn) => fn !== cb)
        }
    }
}
// Example Usage
const emitter = new EventEmitter()
const greet = (name: string) => console.log(`Hello, ${name}!`)

emitter.on('greet', greet)
emitter.emit('greet', 'Alice') // "Hello, Alice!"
emitter.off('greet', greet)
emitter.emit('greet', 'Bob') // No output
export default EventEmitter
