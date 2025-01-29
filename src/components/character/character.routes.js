import express from 'express';
import characterController from './character.controller.js';

const characterRouter = express.Router();

characterRouter.get('/', characterController.getCharacters);

export default characterRouter;
