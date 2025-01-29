import express from 'express';
import characterController from './character.controller.js';
import { validateGetCharacters } from './character.validator.js';

const characterRouter = express.Router();

characterRouter.get('/', validateGetCharacters, characterController.getCharacters);

export default characterRouter;
