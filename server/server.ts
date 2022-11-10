import bodyParser from 'body-parser';
import express from 'express';
import calculator from './api/calculator';

const app = express();
const port = process.env.port || 4000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', calculator);

app.listen(port, () => console.log(`Launched on port ${port}`));
