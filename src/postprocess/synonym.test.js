import * as model from 'model'
import synonym from './synonym'

describe('synonym', () => {
  it('return correctly', () => {
    const sceneList = [
      {
        boundingPoly: {
          vertices: [
            {
              x: 884,
              y: 640,
            },
            {
              x: 1434,
              y: 656,
            },
            {
              x: 1449,
              y: 718,
            },
            {
              x: 874,
              y: 700,
            },
          ],
        },
        description: 'กรงเทพบหานคร',
        confidence: 0.6,
        field: 'vehicle_license_province',
      },
      {
        boundingPoly: {
          vertices: [
            {
              x: 884,
              y: 640,
            },
            {
              x: 1434,
              y: 656,
            },
            {
              x: 1449,
              y: 718,
            },
            {
              x: 874,
              y: 700,
            },
          ],
        },
        description: 'กรง',
        confidence: 0.3,
        field: 'vehicle_license_province',
      },
    ]

    const type = 'car_registration_upper'
    const { fields } = model.mapping[type]

    const result = synonym(fields, sceneList)
    expect(result).toMatchSnapshot()
  })
})
