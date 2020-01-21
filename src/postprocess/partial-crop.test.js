import path from 'path'
import fs from 'fs'

import * as model from 'model'
import partialCrop from './partial-crop'

describe('partialCrop', () => {
  it('return crop correctly', async () => {
    const filePath = path.join(
      __dirname,
      '../__fixtures__/car-registration-upper/14.jpg'
    )

    const buffer = fs.readFileSync(filePath)

    const polygon = [
      {
        field: 'vehicle_license_province',
        description: 'กรุงเทพมหานคร',
        boundingPoly: {
          vertices: [
            [
              {
                x: 2880,
                y: 606,
              },
              {
                x: 3340,
                y: 611,
              },
              {
                x: 3338,
                y: 756,
              },
              {
                x: 2879,
                y: 751,
              },
            ],
          ],
        },
      },
      {
        field: 'vehicle_chassis_number',
        description: 'HLHJF350XK5629846',
        boundingPoly: {
          vertices: [
            [
              {
                x: 1694,
                y: 975,
              },
              {
                x: 2322,
                y: 973,
              },
              {
                x: 2322,
                y: 1054,
              },
              {
                x: 1694,
                y: 1056,
              },
            ],
          ],
        },
      },
      {
        field: 'vehicle_license_number',
        description: '9กร 7876',
        boundingPoly: {
          vertices: [
            [
              {
                x: 1994,
                y: 662,
              },
              {
                x: 2092,
                y: 662,
              },
              {
                x: 2092,
                y: 703,
              },
              {
                x: 1994,
                y: 703,
              },
            ],
            [
              {
                x: 2136,
                y: 663,
              },
              {
                x: 2286,
                y: 663,
              },
              {
                x: 2286,
                y: 703,
              },
              {
                x: 2136,
                y: 703,
              },
            ],
          ],
        },
      },
    ]
    const type = 'car_registration_upper'
    const { fields } = model.mapping[type]

    const result = await partialCrop(Buffer.from(buffer), fields, polygon)

    expect(result).toMatchSnapshot()
  }, 10000)
})
