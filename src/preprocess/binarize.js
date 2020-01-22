import cv from 'opencv4nodejs'

export default async (inputImage) => {
  // const blur = await inputImage.bilateralFilterAsync(5, 75, 75)

  // return await blur.thresholdAsync(0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

  let image = inputImage

  image = await image.adaptiveThresholdAsync(
    255,
    cv.ADAPTIVE_THRESH_MEAN_C,
    cv.THRESH_BINARY,
    13,
    12
  )

  image = await image.erodeAsync(new cv.Mat(3, 3, cv.CV_8U, 1))

  image = await image.dilateAsync(new cv.Mat(3, 3, cv.CV_8U, 1))

  return image
}
