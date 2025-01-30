import DragonBallApiService from '../../../services/dragonBallApi.js';
import { parseData } from '../utils/parsePlanetData.js';
import { sortPlanetReportPipeline } from '../utils/pipelines.js';
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
      let planetReport = await Report.aggregate(sortPlanetReportPipeline(planetId));

      planetReport = planetReport[0]

      if (!planetReport) {
        const planetInfo = await DragonBallApiService.getPlanetInfo(planetId);
        const planetParseData = parseData(planetInfo);
        console.log(`Info: Creating report for Planet ID: ${planetId}`);

        planetReport = await this.createReport({
          planetId: planetInfo.id,
          name: planetInfo.name,
          affiliationReport: planetParseData
        })

        planetReport = planetReport.toObject();

        planetReport.id = planetReport.planetId;

        delete planetReport.planetId;

        planetReport.affiliationReport = planetReport.affiliationReport
          .map(({ _id, createdAt, updatedAt, ...affiliation }) => ({
            ...affiliation,
            characters: affiliation.characters
              .sort((a, b) => b.ki - a.ki)
              .map(({ _id, createdAt, updatedAt, characterId, ...rest }) => ({
                id: characterId,
                ...rest
              }))
          }))
          .sort((a, b) => a.affiliation.localeCompare(b.affiliation));

        console.log(`Info: Report created successfully with ID: ${planetReport._id}`);
      }

      return planetReport;
    } catch (error) {
      throw new Error('Error on get report', error);
    }
  }
}

export default new ReportService();
