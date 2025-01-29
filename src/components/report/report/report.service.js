import DragonBallApiService from '../../../services/dragonBallApi.js';
import { parseData } from '../utils/parsePlanetData.js';
import { Report } from './report.model.js';
class ReportService {
  constructor(reportModel) {
    this.reportModel = reportModel;
  }

  async createReport(data) {
    return Report.create(data)
  }

  async getReportByPlanetId(planetId) {
    console.log(`Info: Get report for Planet ID: ${planetId}`);
    try {
      let planetReport = await Report.findOne({ planetId });

      if (!planetReport) {
        const planetInfo = await DragonBallApiService.getPlanetInfo(planetId);
        const planetParseData = parseData(planetInfo);
        console.log(`Info: Creating report for Planet ID: ${planetId}`);

        planetReport = await this.createReport({
          planetId: planetInfo.id,
          name: planetInfo.name,
          affiliationReport: planetParseData
        })

        console.log(`Debug: Report created successfully with ID: ${planetReport._id}`);
      }

      return planetReport;
    } catch (error) {
      throw new Error('Error on get report', error);
    }
  }
}

export default new ReportService();
