import * as fp from 'lodash/fp'
import round from 'lodash/round'

import { getPolygon, getOGPolygon, getText, getConfidence } from 'selector'
import { intersect } from 'utils'

const SELECTED_RATIO = 0.55

export const merge = (dataList) => {
  const description = fp.pipe(fp.map(getText), fp.join(''), fp.trim)(dataList)

  const confidence = fp.pipe(
    fp.map(getConfidence),
    fp.sum,
    (confidence) => round(confidence / fp.size(dataList), 2)
    //
  )(dataList)

  const polygons = fp.pipe(fp.map(getOGPolygon))(dataList)
  // const polygons = fp.pipe(fp.map(getOGPolygon), fp.flatten)(dataList)
  // const xList = fp.map(fp.get('x'), polygons)
  // const yList = fp.map(fp.get('y'), polygons)

  // const minX = fp.min(xList)
  // const maxX = fp.max(xList)
  // const minY = fp.min(yList)
  // const maxY = fp.max(yList)

  // const vertices = [
  //   { x: minX, y: minY },
  //   { x: maxX, y: minY },
  //   { x: maxX, y: maxY },
  //   { x: minX, y: maxY },
  // ]

  return {
    boundingPoly: { vertices: polygons },
    description,
    confidence,
  }
}

export default (sceneList, wordList, mapping) => {
  const filteredSceneList = fp.pipe(
    fp.reject(
      fp.pipe(
        getText,
        fp.containsWith(wordList)
        //
      )
    )
  )(sceneList)

  return fp.pipe(
    fp.mapWithKey(({ poly: basePolygon }, key) => {
      const indexList = []
      const selectedDataList = fp.pipe(
        fp.filterWithKey((data, index) => {
          const scenePolygon = getPolygon(data)

          if (fp.size(scenePolygon) < 4) return false
          if (fp.size(basePolygon) < 4) return false

          try {
            const ratio = intersect(basePolygon, scenePolygon)

            const isSelected = ratio > SELECTED_RATIO

            if (isSelected) {
              indexList.push(index)
            }

            return isSelected
          } catch (error) {
            return false
          }
        })
      )(filteredSceneList)

      indexList.forEach((index, offset) => {
        filteredSceneList.splice(index - offset, 1)
      })

      if (fp.isEmpty(selectedDataList)) {
        return [{ field: key, description: '', confidence: 0 }]
      }

      const mergeResult = merge(selectedDataList)

      return fp.set('field', key, mergeResult)
    }),
    fp.flatten
  )(mapping)
}
