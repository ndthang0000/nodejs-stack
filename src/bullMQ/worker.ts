import { Worker } from 'bullmq';
import { redisConfig } from '../redis/redis';

async function paintCar(color: string) {
  console.log(`Painting car ${color}`);
}

const worker = new Worker('Paint', async job => {
  if (job.name === 'cars') {
    await paintCar(job.data.color);
  }
}, { connection: redisConfig, useWorkerThreads: true, concurrency: 5 });