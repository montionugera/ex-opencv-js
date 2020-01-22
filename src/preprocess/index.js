import cv from 'opencv4nodejs'

import binarize from './binarize'
import blur from './blur'

export default async (buffer) => {
  let image = await cv.imdecodeAsync(buffer)

  // image = await image.convertScaleAbsAsync(3)

  image = await image.bgrToGrayAsync()

  image = await binarize(image)

  // image = await blur(image)

  const result = await cv.imencodeAsync('.jpg', image, [
    cv.IMWRITE_JPEG_QUALITY,
    0,
  ])

  return result.toString('base64')
}
