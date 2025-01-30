import { validationResult } from 'express-validator';
import ReportService from '../components/report/report/report.service.js';
import DragonBallApi from '../services/dragonBallApi.js';
import { Report } from '../components/report/report/report.model.js';
import { parseData } from '../components/report/utils/parsePlanetData.js';
import ReportController from '../components/report/report/report.controller.js'

jest.mock('../components/report/report/report.model.js', () => ({
  Report: {
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    aggregate: jest.fn(),
  }
}));

jest.mock('../components/report/utils/pipelines.js')

jest.mock('../services/dragonBallApi.js')

jest.mock('express-validator');

jest.mock('../services/dragonBallApi.js');

beforeEach(() => {
  jest.resetAllMocks();
});

const mockResponseGetReport = {
  id: 1,
  name: 'Namek',
  affiliationReport: [
    {
      affiliation: 'Z Fighter',
      characters: [
        {
          id: 3,
          name: "Piccolo",
          ki: "2.000.000",
          race: "Namekian",
          image: "https://dragonball-api.com/characters/picolo_norma...",
        }
      ]
    }
  ]
}

describe('Report service', () => {
  test('Find or create report', async () => {
    const mockData = {
      planetId: 1,
      name: 'Namek',
      affiliationReport: [
        {
          affiliation: 'Z Fighter',
          characters: [
            {
              characterId: 1,
              name: "Piccollo",
              ki: '2.000.000',
              race: 'Namekian',
              image: 'https://image.com'
            }
          ]
        }
      ]
    }

    const options = {
      new: true,
      upsert: true,
      useFindAndModify: false
    }

    Report.findOneAndUpdate.mockResolvedValue(mockData);

    const result = await ReportService.findOneAndUpdateReport({ planetId: mockData.planetId }, mockData, options);

    expect(result).toEqual(mockData);
  })

  test('Call this.create report on get report planet id and return report created', async () => {
    const mockPlanetData = {
      id: 1,
      name: 'Namek',
      isDestroyed: true,
      description: 'Planeta natal de los Namekianos. Escenario de impo...',
      image: 'https://dragonball-api.com/planetas/Namek_U7.webp',
      deletedAt: null,
      characters: [
        {
          id: 3,
          name: "Piccolo",
          ki: "2.000.000",
          maxKi: "500.000.000",
          race: "Namekian",
          gender: "Male",
          description: "Es un namekiano que surgió tras ser creado en los ...",
          image: "https://dragonball-api.com/characters/picolo_norma...",
          affiliation: "Z Fighter",
          deletedAt: null,
        }
      ]
    }

    Report.aggregate.mockResolvedValue([]);

    DragonBallApi.getPlanetInfo.mockResolvedValue(mockPlanetData);

    const planetParseData = parseData(mockPlanetData);

    Report.findOneAndUpdate.mockResolvedValue(
      {
        planetId: mockPlanetData.id,
        name: mockPlanetData.name,
        affiliationReport: planetParseData,
        toObject: jest.fn().mockReturnValue({
          planetId: mockPlanetData.id,
          name: mockPlanetData.name,
          affiliationReport: planetParseData,
        }),
      }
    )

    const reportCreated = await ReportService.getReportByPlanetId(1)

    expect(Report.findOneAndUpdate).toHaveBeenCalled();

    expect(reportCreated).toEqual(mockResponseGetReport)
  })
})

describe('ReportController - getReport', () => {
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
      params: {}
    };
    const res = mockRes();

    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: 'PlanetId must be a number', param: 'planetId' }],
    });

    await ReportController.getReportByPlanetId(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: 'PlanetId must be a number', param: 'planetId' }],
    });
  });

  it('return 200 when get report successfully', async () => {
    const req = {
      params: {
        planetId: 1,
      }
    };
    const res = mockRes();

    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    jest.spyOn(ReportService, 'getReportByPlanetId').mockResolvedValue(mockResponseGetReport);

    await ReportController.getReportByPlanetId(req, res, mockNext);

    expect(ReportService.getReportByPlanetId).toHaveBeenCalled()

    expect(res.status).toHaveBeenCalledWith(200);
  });
});