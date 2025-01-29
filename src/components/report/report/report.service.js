import DragonBallApiService from '../../../services/dragonBallApi.js';
import { parseData } from '../utils/parsePlanetData.js';
import { Report } from './report.model.js';
class ReportService {
  constructor(reportModel) {
    this.reportModel = reportModel;
  }

  async getReportByPlanetId(planetId) {
    try {
      let planetReport = await Report.findOne({ planetId });

      if (!planetReport) {
        const planetInfo = await DragonBallApiService.getPlanetInfo(planetId);
        const planetParseData = parseData(planetInfo);

        planetReport = await Report.create({
          planetId: planetInfo.id,
          name: planetInfo.name,
          affiliationReport: planetParseData
        });
      }

      return planetReport;
    } catch (error) {
      throw new Error('Error on get report', error);
    }
  }
}

export default new ReportService();
