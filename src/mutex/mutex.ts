class Mutex {
  private _locked: boolean = false
  private _queue: Function[] = []

  lock() {
    return new Promise((resolve, reject) => {
      if (this._locked) {
        this._queue.push(resolve)
        return
      }
      this._locked = true
      resolve(null)
    })
  }

  unlock() {
    if (this._queue.length > 0) {
      const resolve = this._queue.shift()
      if (resolve) {
        resolve(null)
      }
    } else {
      this._locked = false
    }
  }
}

const mutex = new Mutex()

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const task = async (name: string) => {
  console.log(`Task ${name} started`)
  await mutex.lock()
  await sleep(1000)
  await mutex.unlock()
  console.log(`Task ${name} finished`)
}

task('A')
task('B')
task('C')

export default Mutex
