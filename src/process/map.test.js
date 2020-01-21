import mapping from 'model/mapping/car-registration-upper'

import map from './map'

describe('map', () => {
  const sceneList = [
    {
      description: 'foo ',
      confidence: 0.5,
      boundingPoly: {
        vertices: [
          { x: 296 - 5, y: 158 - 5 },
          { x: 718 - 5, y: 158 - 5 },
          { x: 718 - 5, y: 218 - 5 },
          { x: 296 - 5, y: 218 - 5 },
        ],
      },
      ogBoundingPoly: {
        vertices: [
          { x: 296 - 5, y: 158 - 5 },
          { x: 718 - 5, y: 158 - 5 },
          { x: 718 - 5, y: 218 - 5 },
          { x: 296 - 5, y: 218 - 5 },
        ],
      },
    },
    {
      description: '123',
      confidence: 0.7,
      boundingPoly: {
        vertices: [
          { x: 296, y: 158 },
          { x: 718, y: 158 },
          { x: 718, y: 218 },
          { x: 296, y: 218 },
        ],
      },
      ogBoundingPoly: {
        vertices: [
          { x: 296, y: 158 },
          { x: 718, y: 158 },
          { x: 718, y: 218 },
          { x: 296, y: 218 },
        ],
      },
    },
  ]

  it('return correctly', () => {
    const result = map(sceneList, [], mapping.fields)

    expect(result).toEqual({})
  })
})
