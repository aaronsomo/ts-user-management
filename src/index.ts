import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use('/', routes)

// comment app.listen() to run tests, will run into EADDRINUSE error, otherwise
app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});

export default app