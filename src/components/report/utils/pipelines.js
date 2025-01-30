export function sortPlanetReportPipeline(planetId) {
  return [
    {
      $match: {
        planetId: Number(planetId),
      },
    },
    {
      $unwind: "$affiliationReport"
    },
    {
      $unwind: "$affiliationReport.characters"
    },
    {
      $addFields: {
        numberKi: {
          $toInt: {
            $replaceAll: {
              input: "$affiliationReport.characters.ki",
              find: ".",
              replacement: ""
            }
          }
        }
      }
    },
    {
      $sort: {
        "affiliationReport.affiliation": 1,
        numberKi: -1
      }
    },
    {
      $group: {
        _id: {
          id: "$planetId",
          name: "$name",
          affiliation: "$affiliationReport.affiliation"
        },
        characters: { $push: "$affiliationReport.characters" }
      }
    },
    {
      $sort: {
        "_id.affiliation": 1
      }
    },
    {
      $group: {
        _id: {
          id: "$_id.id",
          name: "$_id.name"
        },
        affiliationReport: {
          $push: {
            affiliation: "$_id.affiliation",
            characters: "$characters"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        id: "$_id.id",
        name: "$_id.name",
        affiliationReport: {
          $map: {
            input: "$affiliationReport",
            as: "affiliation",
            in: {
              affiliation: "$$affiliation.affiliation",
              characters: {
                $map: {
                  input: "$$affiliation.characters",
                  as: "character",
                  in: {
                    id: "$$character.characterId",
                    name: "$$character.name",
                    ki: "$$character.ki",
                    numberKi: "$$character.numberKi",
                    race: "$$character.race",
                    image: "$$character.image"
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}