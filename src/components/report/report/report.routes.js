import express from 'express';
import ReportController from './report.controller.js';
import { validateGetReport } from './report.validator.js';

const reportRouter = express.Router();

reportRouter.get('/:planetId', validateGetReport, ReportController.getReportByPlanetId);

export default reportRouter;
