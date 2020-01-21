import * as fp from 'lodash/fp'
import moment from 'moment'
import i18n from 'i18n'

export const isAnswer = (key) => (text, { language } = {}) => i18n().getFixedT(language)(key) === text
export const isNotEmpty = (text) => {
  if (fp.isString(text) || fp.isArray(text) || fp.isPlainObject(text)) {
    return !fp.isEmpty(text)
  }

  if (fp.isNumber(text)) {
    return fp.isFinite(text)
  }

  return !fp.isNil(text)
}
export const isEmptyString = fp.ifElse(fp.isString, fp.isEmpty, fp.constant(false))
export const isEnglish = (text) => isEmptyString(text) || /^[a-zA-Z ]+$/.test(text)
export const isThai = (text) => isEmptyString(text) || /^[\u0E00-\u0E7F ]+$/.test(text)
export const isName = (text) => isEmptyString(text) || /^[a-zA-Z\u0E00-\u0E7F0-9. ]+$/.test(text)
export const isNumeric = (text) => isEmptyString(text) || /^[0-9]+$/.test(text)
export const isDate = (text) => isEmptyString(text) || moment(text, 'YYYY-MM-DD', true).isValid()
export const isThaiNationalId = (id) => {
  if (!isNumeric(id) || id.length !== 13) return false

  let sum = 0
  for (let i = 0; i < 12; i += 1) {
    sum += parseInt(id.charAt(i), 10) * (13 - i)
  }
  const check = (11 - (sum % 11)) % 10
  if (check === parseInt(id.charAt(12), 10)) {
    return true
  }
  return false
}

export const getModelErrorMessages = (fields) => (...args) =>
  fp.pipe(
    fp.values,
    fp.filter(fp.has('validate')),
    fp.map(({ field, getErrorMessages, enable }) => {
      let isEnable = true

      if (enable) {
        isEnable = enable(...args)
      }

      if (isEnable && getErrorMessages) {
        return {
          [field]: getErrorMessages(...args),
        }
      }

      return {}
    }),
    fp.mergeAll
  )(fields)

export const validateModel = (fields) => (...args) => {
  const errorMessages = getModelErrorMessages(fields)(...args)

  return fp.all(fp.isEmpty, errorMessages)
}
