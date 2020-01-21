import * as fp from 'lodash/fp'
import { get, all } from 'shades'

export const getOGPolygon = fp.pipe(
  fp.get('ogBoundingPoly.vertices'),
  fp.map(({ x, y }) => ({ x, y }))
)

export const getPolygon = fp.pipe(
  fp.get('boundingPoly.vertices'),
  fp.map(({ x, y }) => ({ x, y }))
)

export const createPolygon = (vertices) =>
  fp.set('boundingPoly.vertices', vertices, {})

export const updatePolygon = (fn) =>
  fp.pipe(
    fp.map((props) => ({
      ...props,
      ogBoundingPoly: props.boundingPoly,
    })),
    fp.map(fp.update('boundingPoly.vertices', fn)),
    fp.reject(fp.pipe(getPolygon, fp.isEmpty))
  )

export const getText = fp.get('description')

export const getConfidence = fp.get('confidence')

export const getWords = fp.pipe(
  get(
    'fullTextAnnotation',
    'pages',
    all,
    'blocks',
    all,
    'paragraphs',
    all,
    'words'
  ),
  fp.flattenDeep
)

export const getSize = fp.pipe(
  fp.get('fullTextAnnotation.pages[0]'),
  (data) => {
    return { width: fp.get('width', data), height: fp.get('height', data) }
  }
)

export const getTextAnnotation = fp.pipe(fp.get('textAnnotations'), fp.tail)

export const getFullTextAnnotation = fp.pipe(
  getWords,
  fp.map((word) => {
    const confidence = fp.get('confidence', word)
    const boundingPoly = fp.get('boundingBox', word)

    if (confidence < 0.2) return null

    const description = fp.pipe(
      fp.get('symbols'),
      fp.map((symbol) => {
        const breakType = fp.get(['property', 'detectedBreak', 'type'], symbol)
        const str = fp.get('text', symbol)

        if (breakType === 'SPACE') {
          return `${str} `
        }

        return str
      }),
      fp.join('')
    )(word)

    return {
      boundingPoly,
      description,
      confidence,
    }
  }),
  fp.reject(fp.isNil)
)
