import * as fp from 'lodash/fp'
import i18n, { isI18nKey } from 'i18n'

export default ({
  action = {}, event = {}, session = {}, dependencies = {},
} = {}) =>
  fp.pipe(
    fp.concat([]),
    fp.map(
      fp.when(fp.isFunction, (fn) =>
        fn({
          action,
          event,
          session,
          dependencies,
        }))
    ),
    fp.flatten,
    fp.reject(fp.isNil),
    fp.map(
      fp.traverse(
        fp.when(
          fp.pipe(
            fp.nthArg(1),
            fp.last,
            fp.anyPass([fp.isEqual('text'), fp.isEqual('altText'), fp.isEqual('label')])
          ),
          fp.pipe(
            fp.concat([]),
            fp.map(
              fp.when(isI18nKey, (value) =>
                i18n().getFixedT(session.language)(value, {
                  action,
                  event,
                  session,
                  dependencies,
                  interpolation: { escapeValue: false },
                }))
            ),
            fp.reject(fp.isNil),
            fp.join(' ')
          )
        )
      )
    ),
    fp.reject(fp.anyPass(fp.isNil, fp.isEmpty))
  )
