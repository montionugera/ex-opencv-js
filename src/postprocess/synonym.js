import * as fp from 'lodash/fp'

import fuzz from 'fuzzball'

const SYNONYM_RATIO = 0.7

export const findSynonym = (word, list) => {
  if (!word || !fp.isString(word)) return undefined

  const synonym = fuzz.extract(word, list, {
    scorer: fuzz.partial_ratio,
    limit: 1,
    cutoff: SYNONYM_RATIO * 100,
  })

  return fp.pipe(fp.flatten, fp.first)(synonym)
}

export default (fields, sceneList) => {
  const result = fp.map((data) => {
    const field = fp.get('field', data)

    const synonym = fp.get([field, 'synonym'], fields)

    if (synonym) {
      const description = fp.get('description', data)

      const result = findSynonym(description, synonym)
      if (result) {
        return fp.set('description', result, data)
      }
    }

    return data
  })(sceneList)

  return result
}
