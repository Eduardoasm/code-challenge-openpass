import { validationResult } from 'express-validator';
import DragonBallApiService from '../../services/dragonBallApi.js';

class CharacterController {
  async getCharacters(req, res, next) {
    console.log('Info: Get characters');
    const { race, affiliation } = req.query;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const characters = await DragonBallApiService.getCharactersByFilter({ race, affiliation });
      res.status(200).json({ success: true, data: characters });
    } catch (error) {
      next(error);
    }
  }
}

export default new CharacterController();
