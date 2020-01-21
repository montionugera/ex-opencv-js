import * as fp from 'lodash/fp'

export const createSelector = (config) => (dependencies) =>
  fp.traverse(
    fp.when(
      fp.pipe(
        fp.nthArg(1),
        fp.last,
        fp.anyPass([
          fp.isEqual('value'),
          fp.isEqual('data'),
        ])
      ),
      fp.when(fp.isFunction, (fn) => fn(dependencies))
    )
  )(config)
