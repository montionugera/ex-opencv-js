import scene from '__fixtures__/car-registration-upper/1.json'
import { getFullTextAnnotation } from 'selector'

import * as model from 'model'

import filter from './filter'

describe('filter', () => {
  it('return correctly', () => {
    const type = 'car_registration_upper'
    const baseList = model.base[type]
    const sceneList = getFullTextAnnotation(scene)

    const wordList = ['อยู่ที่', 'อยู่ที่']
    const { filteredBaseList, filteredSceneList } = filter(
      baseList,
      sceneList,
      wordList
    )

    expect(filteredBaseList.length).toEqual(filteredSceneList.length)
  })
})
