const clothes = [
  {
    _id: 1,
    name: 'OUTERWEAR',
  },
  {
    _id: 2,
    name: 'DRESSES',
  },
  {
    _id: 3,
    name: 'TOPS',
  },
  {
    _id: 4,
    name: 'BOTTOMS',
  },
];

const price = [
  {
    _id: 0,
    name: 'Any',
    array: [],
  },
  {
    _id: 1,
    name: '$0 to $99',
    array: [0, 99],
  },
  {
    _id: 2,
    name: '$100 to $149',
    array: [100, 149],
  },
  {
    _id: 3,
    name: '$150 to $199',
    array: [150, 199],
  },
  {
    _id: 4,
    name: '$200 to $249',
    array: [200, 249],
  },
  {
    _id: 5,
    name: 'More than $250',
    array: [250, 1500000],
  },
];

export { clothes, price };
