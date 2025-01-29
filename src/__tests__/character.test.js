import { validationResult } from 'express-validator';
import CharacterController from '../components/character/character.controller.js';
import DragonBallApiService from '../services/dragonBallApi.js';

jest.mock('express-validator');
jest.mock('../services/dragonBallApi.js');

describe('CharacterController - getCharacters', () => {
  const mockReq = () => ({
    query: {},
  });

  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  it('return 400 if have validation errors', async () => {
    const req = {
      query: {}
    };
    const res = mockRes();

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: 'Invalid input', query: 'race' }],
    });

    await CharacterController.getCharacters(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Invalid input', query: 'race' }],
    });
  });

  it('return 200 when data obtained successfully', async () => {
    const req = {
      query: {
        race: 'Saiyan',
        affiliation: 'Z Fighters'
      }
    };
    const res = mockRes();

    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    const mockCharacters = [
      { id: 1, name: 'Goku', race: 'Saiyan', affiliation: 'Z Fighters' },
      { id: 2, name: 'Vegeta', race: 'Saiyan', affiliation: 'Z Fighters' },
    ];

    DragonBallApiService.getCharactersByFilter.mockResolvedValue(mockCharacters);

    await CharacterController.getCharacters(req, res, mockNext);

    expect(DragonBallApiService.getCharactersByFilter).toHaveBeenCalledWith({
      race: 'Saiyan',
      affiliation: 'Z Fighters',
    });

    expect(res.status).toHaveBeenCalledWith(200);
  });
});