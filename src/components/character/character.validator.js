import { query } from 'express-validator';

export const validateGetCharacters = [
  query('race').optional().isString().withMessage('Race must be a string'),
  query('affiliation').optional().isString().withMessage('Affiliation must be a string')
];
