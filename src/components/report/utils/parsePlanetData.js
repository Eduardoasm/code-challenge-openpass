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

    if (
      curr.ki.toLowerCase().includes('billion') ||
      curr.ki.toLowerCase().includes('million') ||
      curr.ki.toLowerCase().includes('trillion') ||
      curr.ki.toLowerCase().includes('quadrillion') ||
      curr.ki.toLowerCase().includes('unknown')
    ) {
      curr.ki = convertToFormattedNumberString(curr.ki)
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

function convertToFormattedNumberString(value) {
  const units = {
    'billion': 1e9,
    'million': 1e6,
    'thousand': 1e3,
    'trillion': 1e12,
    'quadrillion': 1e15,
  };

  const [number, unit] = value.split(" ");

  if (number === "unknown") {
    return "0"
  }
  const unitToLowerCase = unit.toLowerCase();

  let numericValue = parseFloat(number);

  if (!units[unitToLowerCase]) {
    return "0";
  }

  if (units[unitToLowerCase]) {
    numericValue *= units[unitToLowerCase];
  }

  return numericValue.toLocaleString("de-DE");
}