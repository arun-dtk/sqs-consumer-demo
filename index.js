const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
 
const app = Consumer.create({
  queueUrl: process.env.QUEUE_URL,
  handleMessage: async (message) => {
    console.log(message)
  },
  sqs: new AWS.SQS()
});
 
app.on('error', (err) => {
  console.error(err.message);
});
 
app.on('processing_error', (err) => {
  console.error(err.message);
});
 
app.on('timeout_error', (err) => {
 console.error(err.message);
});
 
app.start();
console.log('Consumer started')