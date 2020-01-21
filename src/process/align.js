/* eslint-disable no-bitwise */
/* eslint-disable new-cap */
import * as fp from 'lodash/fp'
import jsfeat from 'jsfeat'
import { updatePolygon } from 'selector'
import { isBetween } from 'utils'

export default (sceneList, { src, to, box }) => {
  const kernel = new jsfeat.motion_model.homography2d()
  const transformMatrix = new jsfeat.matrix_t(3, 3, jsfeat.F32_t | jsfeat.C1_t)
  const count = fp.size(src)

  // each point will be marked as good(1) or bad(0)
  const maskMatrix = new jsfeat.matrix_t(count, 1, jsfeat.U8_t | jsfeat.C1_t)

  const threshold = 3 // max error to classify as inlier
  const eps = 0.5 // max outliers ratio
  const prob = 0.99 // probability of success
  const params = new jsfeat.ransac_params_t(count, threshold, eps, prob)

  const maxIters = count

  // TODO - reject if isAlign is false
  const isAlign = jsfeat.motion_estimator.ransac(
    params,
    kernel,
    src,
    to,
    count,
    transformMatrix,
    maskMatrix,
    maxIters
  )

  let minX
  let minY
  let maxX
  let maxY

  if (box) {
    const xList = fp.pipe(fp.flatten, fp.map(fp.get('x')))(box)
    const yList = fp.pipe(fp.flatten, fp.map(fp.get('y')))(box)

    minX = fp.min(xList)
    minY = fp.min(yList)
    maxX = fp.max(xList)
    maxY = fp.max(yList)
  }

  const hasBox =
    fp.isFinite(minX) &&
    fp.isFinite(minY) &&
    fp.isFinite(maxX) &&
    fp.isFinite(maxY)

  return fp.pipe(
    updatePolygon(
      fp.ifElse(
        fp.any(({ x, y }) => {
          if (hasBox) {
            return isBetween(x, minX, maxX) && isBetween(y, minY, maxY)
          }

          return true
        }),
        fp.map(({ x, y }) => {
          const H = transformMatrix.data
          let w = H[6] * x + H[7] * y + H[8] * 1

          if (w === 0) {
            w = 1
          }

          return {
            x: Math.abs(fp.round((H[0] * x + H[1] * y + H[2] * 1) / w)),
            y: Math.abs(fp.round((H[3] * x + H[4] * y + H[5] * 1) / w)),
          }
        }),
        fp.constant([])
      )
    )
  )(sceneList)
}
