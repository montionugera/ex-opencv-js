import * as fp from 'lodash/fp'

import { validateModel, getModelErrorMessages, isNotEmpty } from 'validation'

const getErrorMessages = ({ validate: config, field }) => ({ session }) =>
  fp.map(({ validate, message }) => ({
    message,
    isValid: validate(fp.get(field, session), session),
  }))(config)

const isValid = ({ validate: config }) => (...args) =>
  fp.all(({ validate }) => validate(...args), config)

export const createModel = fp.pipe(
  fp.traverse(
    fp.pipe(
      fp.when(fp.has('path'), (config, path, obj) =>
        fp.set('field', `${obj.base}.${config.path}`, config)),
      fp.when(fp.isMatch({ required: true }), (config) =>
        fp.update(
          'validate',
          fp.pipe(
            fp.defaultTo([]),
            fp.prepend({
              message: 'validation:error.empty',
              validate: isNotEmpty,
            })
          ),
          config
        )),
      fp.when(fp.has('validate'), (config) => fp.set('isValid', isValid(config), config)),
      fp.when(fp.has('validate'), (config) =>
        fp.set(
          'getErrorMessages',
          fp.pipe(
            getErrorMessages(config),
            fp.filter(fp.isMatch({ isValid: false })),
            fp.map(fp.get('message'))
          ),
          config
        )),
      fp.when(fp.has('validate'), (config) =>
        fp.set(
          'validate',
          fp.pipe(
            getErrorMessages(config),
            fp.all(fp.isMatch({ isValid: true }))
          ),
          config
        ))
    )
  ),
  (config) => fp.set('validate', validateModel(config.fields), config),
  (config) => fp.set('getErrorMessages', getModelErrorMessages(config.fields), config)
)
