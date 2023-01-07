import TSPSolver from '@nikbelikov/tsp-solver';

const getDistance = (coordinates1, coordinates2) => {
  if (!coordinates2) return 0;
  const distance = Math.sqrt(
    Math.abs(
      Math.pow(coordinates1[0] - coordinates2[0], 2) +
        Math.pow(coordinates1[1] - coordinates2[1], 2)
    )
  );
  return distance;
};

const getPoints = (coordinates) => {
  return coordinates.map((coordinatePair, index) => ({id: index, name: `${coordinatePair}` }))
}

const getValues = (points) => {
  const values = []
  for (const mainPoint of points) {
    for (const subPoint of points) {
      if (subPoint.id <= mainPoint.id) {
        continue
      }
      values.push({set: [mainPoint.id, subPoint.id], value: getDistance(JSON.parse(`[${mainPoint.name}]`), JSON.parse(`[${subPoint.name}]`))})
    }
  }
  return values
}

const sortingAlgorithm = (selectedCoordinates) => {
  const points = getPoints(selectedCoordinates)
  
  const values = getValues(points)
  const {result: sortedValues} = TSPSolver(points, values)
  const path = sortedValues.map(({name: valueName}) => JSON.parse(`[${valueName}]`))
  console.log(values);
  path.push(path[0])
  
  const coordinatePairs = path.map((coordinatePair, index, coordinates) => {
    let secondCoordinatePair = coordinates[index + 1];
    if (index === coordinates.length - 1) {
      secondCoordinatePair = coordinates[0];
    }
    return [coordinatePair, secondCoordinatePair];
  });
  
  return coordinatePairs;
};

export default sortingAlgorithm;
