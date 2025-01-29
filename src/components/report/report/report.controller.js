import ReportService from './report.service.js';

class ReportController {
  async getReportByPlanetId(req, res, next) {
    const { planetId } = req.params;
    try {
      const report = await ReportService.getReportByPlanetId(planetId);

      return res.status(200).json({ success: true, data: report });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReportController();
