export const parseData = (planetInfo) => {
  if (!planetInfo || !Array.isArray(planetInfo.characters)) {
    throw new Error('Invalid planetInfo data');
  }

  return planetInfo.characters.reduce((acc, curr) => {
    console.log('Info: Processing Character', curr.name);

    let affiliationFound = acc.find(item => item.affiliation === curr.affiliation);

    if (!affiliationFound) {
      affiliationFound = {
        affiliation: curr.affiliation,
        characters: []
      };
      acc.push(affiliationFound);
    }

    affiliationFound.characters.push({
      characterId: curr.id,
      ki: curr.ki,
      name: curr.name,
      race: curr.race,
      image: curr.image,
    });

    return acc;
  }, []);
};
