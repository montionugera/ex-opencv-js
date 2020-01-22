import * as fp from 'lodash/fp'

import { generateFields } from 'services/vision'
import { polygonHull, polygonScale } from 'geometric'
import cv from 'opencv4nodejs'

export default async (buffer, fields, sceneList, cropScale = 1.2) => {
  const image = await cv.imdecodeAsync(buffer, cv.CV_8UC3)

  return await Promise.all(
    fp.map(async (data) => {
      const field = fp.get('field', data)
      const polygons = fp.get('boundingPoly.vertices', data)
      const isPriority = fp.has([field, 'priority'], fields)

      if (!isPriority || !polygons) return data

      try {
        const polyHull = fp.pipe(
          fp.flatten,
          fp.map(fp.values),
          polygonHull,
          (p) => polygonScale(p, cropScale),
          fp.map(([x, y]) => new cv.Point2(x, y))
          //
        )(polygons)

        const xList = fp.pipe(
          fp.map((p) => p.x),
          fp.flatten
          //
        )(polyHull)
        const yList = fp.pipe(
          fp.map((p) => p.y),
          fp.flatten
          //
        )(polyHull)

        const minX = fp.min(xList)
        const maxX = fp.max(xList)
        const minY = fp.min(yList)
        const maxY = fp.max(yList)

        const borderRect = [
          new cv.Point2(minX, minY),
          new cv.Point2(maxX, minY),
          new cv.Point2(maxX, maxY),
          new cv.Point2(minX, maxY),
        ]

        const mask = new cv.Mat(image.rows, image.cols, cv.CV_8UC1, 0)
        mask.drawFillPoly([polyHull], new cv.Vec3(255, 255, 255))

        let masked = image.bitwiseAnd(mask)
        let whiteBG = new cv.Mat(image.rows, image.cols, cv.CV_8UC1, 255)
        whiteBG = mask.bitwiseNot(whiteBG)
        masked = whiteBG.add(masked)
        const rect = new cv.Contour(borderRect).boundingRect()

        const cropped = await cv.imencodeAsync('.jpg', masked.getRegion(rect))
        const base64 = cropped.toString('base64')

        const scene = await generateFields(base64)
        const result = fp.pipe(
          fp.get('textAnnotations'),
          fp.first,
          fp.get('description'),
          fp.replace('\n', ' '),
          fp.trim
          //
        )(scene)

        if (result) {
          return fp.set('description', result, data)
        }
      } catch (error) {
        console.error(field, error)
      }

      return data
    })(sceneList)
  )
}
