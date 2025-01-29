import express from 'express';
import characterRouter from './components/character/character.routes.js';
import reportRouter from './components/report/report/report.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/characters', characterRouter);
app.use('/report', reportRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
