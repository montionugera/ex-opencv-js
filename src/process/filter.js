import * as fp from 'lodash/fp'
import { getText, getPolygon } from 'selector'

const filterByWord = (wordList, list) =>
  fp.pipe(
    fp.map((word) =>
      fp.pipe(
        fp.findIndex(
          fp.pipe(
            getText,
            fp.allPass([fp.pipe(fp.size, fp.lt(3)), fp.isEqual(word)])
            //
          )
        ),
        (index) => {
          if (index >= 0) {
            const [result] = list.splice(index, 1)

            return result
          }
        }
      )(list)
    ),
    fp.reject(fp.isNil)
  )(wordList)

const toPolygon = fp.pipe(
  fp.orderBy(['description'], ['asc']),
  fp.map(getPolygon),
  fp.flatten
  //
)

export default (baseList, sceneList, wordList) => {
  let filteredBaseList = fp.cloneDeep(baseList)
  let filteredSceneList = fp.cloneDeep(sceneList)

  if (wordList) {
    filteredBaseList = filterByWord(wordList, baseList)
    filteredSceneList = filterByWord(wordList, sceneList)
  }

  if (fp.size(filteredBaseList) < fp.size(filteredSceneList)) {
    const wordList = fp.map(getText, filteredBaseList)
    filteredSceneList = filterByWord(wordList, filteredSceneList)
  }

  if (fp.size(filteredSceneList) < fp.size(filteredBaseList)) {
    const wordList = fp.map(getText, filteredSceneList)
    filteredBaseList = filterByWord(wordList, filteredBaseList)
  }

  return {
    filteredBaseList: toPolygon(filteredBaseList),
    filteredSceneList: toPolygon(filteredSceneList),
  }
}
