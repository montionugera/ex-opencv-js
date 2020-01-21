import * as fp from 'lodash/fp'

import { intersection } from 'polygon-clipping'
import { polygonArea } from 'geometric'

const toPointList = fp.map(fp.values)

export const intersect = (base, scene) => {
  const basePointList = toPointList(base)
  const scenePointList = toPointList(scene)

  const [[intersectedPointList]] = intersection(
    [basePointList],
    [scenePointList]
  )

  return polygonArea(intersectedPointList) / polygonArea(scenePointList)
}

export const isBetween = (x, min, max) => {
  return x >= min && x <= max
}
