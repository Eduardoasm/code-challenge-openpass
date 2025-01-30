import { param } from 'express-validator';

export const validateGetReport = [
  param('planetId').isNumeric().withMessage('Planet id must be a number')
];
