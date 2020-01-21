import * as fp from 'lodash/fp'

export default fp.pipe(
  fp.reduce(
    (obj, { field, description, confidence }) =>
      fp.update(
        field,
        fp.applySpec({
          description,
          confidence,
        }),
        obj
      ),
    {}
  ),
  fp.over([
    fp.mapValues(fp.get('description')),
    fp.applySpec({
      confidence: fp.mapValues(fp.get('confidence')),
    }),
  ]),
  fp.assignAll
)
