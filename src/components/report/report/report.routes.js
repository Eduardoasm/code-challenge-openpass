import express from 'express';
import ReportController from './report.controller.js';

const reportRouter = express.Router();

reportRouter.get('/:planetId', ReportController.getReportByPlanetId);

export default reportRouter;
