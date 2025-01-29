import { param } from 'express-validator';

export const validateGetReport = [
  param('planetId').isNumeric().withMessage('Race must be a number')
];
