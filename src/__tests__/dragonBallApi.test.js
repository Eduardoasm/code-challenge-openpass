import axios from 'axios';
import DragonballApiService from '../services/dragonBallApi.js';

jest.mock('axios');

describe('Get external data', () => {
  test('External api response with data', async () => {
    const mockDragonBallApiData = {
      data: {
        items: [
          { id: 1, name: 'Goku', ki: '200.000.000', race: 'Saiyan', affiliation: 'Z Fighter' },
          { id: 1, name: 'Vegeta', ki: '100.000.000', race: 'Saiyan', affiliation: 'Z Fighter' }
        ]
      }
    };

    const filter = { race: 'Saiyan', affiliation: 'Z Fighter' };

    axios.get.mockResolvedValue(mockDragonBallApiData);

    const result = await DragonballApiService.getCharactersByFilter(filter);

    expect(axios.get).toHaveBeenCalledWith('https://dragonball-api.com/api/characters', {
      params: filter
    });

    expect(result).toEqual(mockDragonBallApiData.data);
  });
});
