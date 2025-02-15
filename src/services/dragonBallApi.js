import axios from 'axios';

class DragonballApiService {
  constructor() {
    this.apiUrl = new URL('https://dragonball-api.com/');
  }

  async getCharactersByFilter({ race, affiliation }) {
    try {
      const { data } = await axios.get(`${this.apiUrl}api/characters`, {
        params: { race, affiliation }
      });

      console.log('Info: characters obtained from dragon ball api');

      return data;
    } catch (error) {
      throw new Error('Error in get characters by filter', error);
    }
  }

  async getPlanetInfo(planetId) {
    try {
      const { data } = await axios.get(`${this.apiUrl}api/planets/${planetId}`);
      console.log('info: planets obtained');
      return data;
    } catch (error) {
      throw new Error('Error in get planets', error);
    }
  }
}

export default new DragonballApiService();
