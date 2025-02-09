import * as fs from 'fs'

// Create a readable stream to read data from a file
const readableStream = fs.createReadStream('./src/stream-file/myFile.txt')

// Handle data events
readableStream.on('data', (chunk: Buffer) => {
  console.log(`Received ${chunk.length} bytes of data.`)
  // Process the data chunk here
})

// Handle end event
readableStream.on('end', () => {
  console.log('End of stream.')
})

// Handle error event
readableStream.on('error', (err: Error) => {
  console.error('Error:', err)
})
