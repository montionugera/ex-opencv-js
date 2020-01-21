import {
  getPolygon,
  createPolygon,
  getTextAnnotation,
  getFullTextAnnotation,
  getSize,
} from 'selector'
import * as model from 'model'

import filter from './filter'
import align from './align'
import map from './map'

export default async (scene, type = 'car_registration_upper') => {
  const base = model.base[type]
  const { fields, whitelist } = model.mapping[type]

  const baseList = getTextAnnotation(base)
  const sceneForBaseList = getTextAnnotation(scene)
  const sceneList = getFullTextAnnotation(scene)

  const borderPolygon = filter(baseList, sceneForBaseList)
  const fieldsPolygon = filter(baseList, sceneForBaseList, whitelist)

  const { width, height } = getSize(base)

  const borderList = [
    createPolygon([
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ]),
  ]
  const [alignedBorderList] = align(borderList, {
    src: borderPolygon.filteredBaseList,
    to: borderPolygon.filteredSceneList,
  })

  const alignedSceneList = align(sceneList, {
    src: fieldsPolygon.filteredSceneList,
    to: fieldsPolygon.filteredBaseList,
    box: getPolygon(alignedBorderList),
  })

  const filteredSceneList = map(alignedSceneList, whitelist, fields)

  return filteredSceneList
}
