import align from './align'

describe('align', () => {
  it('return correctly', () => {
    const baseList = [
      {
        description: 'วันจดทะเบียน',
        boundingPoly: {
          vertices: [
            {
              x: 20,
              y: 156,
            },
            {
              x: 274,
              y: 156,
            },
            {
              x: 274,
              y: 214,
            },
            {
              x: 20,
              y: 214,
            },
          ],
        },
      },
    ]
    const sceneList = [
      {
        description: 'วันจดทะเบียน',
        boundingPoly: {
          vertices: [
            {
              x: 2075,
              y: 305,
            },
            {
              x: 2071,
              y: 694,
            },
            {
              x: 1904,
              y: 692,
            },
            {
              x: 1908,
              y: 303,
            },
          ],
        },
      },
      {
        description: '11',
        boundingPoly: {
          vertices: [
            {
              x: 2069,
              y: 833,
            },
            {
              x: 2068,
              y: 896,
            },
            {
              x: 1901,
              y: 894,
            },
            {
              x: 1902,
              y: 831,
            },
          ],
        },
      },
      {
        description: 'มิถุนายน',
        boundingPoly: {
          vertices: [
            {
              x: 2068,
              y: 968,
            },
            {
              x: 2065,
              y: 1205,
            },
            {
              x: 1897,
              y: 1203,
            },
            {
              x: 1900,
              y: 966,
            },
          ],
        },
      },
    ]

    const basePolygonList = baseList[0].boundingPoly.vertices
    const scenePolygonList = sceneList[0].boundingPoly.vertices

    const result = align(sceneList, {
      src: scenePolygonList,
      to: basePolygonList,
    })
    expect(result[0].boundingPoly.vertices).toEqual(basePolygonList)
  })
})
