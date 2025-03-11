import { Queue, } from 'bullmq';

const queue = new Queue('Paint',
  {
    connection: {
      host: 'localhost',
      port: 6379
    }
  });

queue.add('cars', { color: 'blue' });