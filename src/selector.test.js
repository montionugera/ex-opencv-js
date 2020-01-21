import scene from '__fixtures__/car-registration-upper/1.json'

import { getFullTextAnnotation } from './selector'

describe('getFullTextAnnotation', () => {
  it('return correctly', () => {
    const result = getFullTextAnnotation(scene)
    expect(result).toMatchSnapshot()
  })
})