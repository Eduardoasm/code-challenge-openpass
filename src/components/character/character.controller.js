import DragonBallApiService from '../../services/dragonBallApi.js';

class CharacterController {
  async getCharacters(req, res) {
    const { race, affiliation } = req.query;
    try {
      const characters = await DragonBallApiService.getCharactersByFilter({ race, affiliation });
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CharacterController();
