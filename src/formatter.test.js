import formatter from './formatter'

describe('formatter', () => {
  it('return correctly', () => {
    const filteredSceneList = [
      {
        description: '123',
        confidence: 0.9,
        field: 'A',
      },
      {
        description: '123',
        confidence: 0.7,
        field: 'B',
      },
    ]

    const result = formatter(filteredSceneList)

    expect(result).toEqual({
      A: '123',
      B: '123',
      confidence: { A: 0.9, B: 0.7 },
    })
  })
})
