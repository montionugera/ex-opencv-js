import cv from 'opencv4nodejs'

export default async (image, threshold = 100) => {
  const lp = await image.laplacianAsync(cv.CV_64F)

  const value = lp.meanStdDev().stddev.at(0, 0) ** 2

  if (value < threshold) {
    const kernel = [
      [-1, -1, -1],
      [-1, 9, -1],
      [-1, -1, -1],
    ]
    return cv.filter2D(image, -1, kernel)
  }

  return image
}
