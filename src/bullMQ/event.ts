import { QueueEvents } from 'bullmq';

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  console.log('done painting: ', jobId);
});

queueEvents.on('waiting', ({ jobId }) => {
  console.log('waiting to paint: ', jobId);
});

queueEvents.on(
  'failed',
  ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
    console.error('error painting', failedReason);
  },
);