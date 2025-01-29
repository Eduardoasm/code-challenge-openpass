import express from 'express';
import characterRouter from './components/character/character.routes.js';
import reportRouter from './components/report/report/report.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use('/api/characters', characterRouter);
app.use('/api/reports', reportRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
