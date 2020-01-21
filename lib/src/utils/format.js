import * as fp from 'lodash/fp'
import moment from 'moment'

export const numberFormatting = (number, decimal = 2) => {
  if (fp.isNil(number)) return ' - '

  return parseFloat(Math.round(number * 100) / 100)
    .toFixed(decimal)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const dateFormatting = (date, locale = 'th') => {
  let instance = moment(date).locale(locale)

  if (locale === 'th') {
    instance = instance.add(543, 'years')
  }

  return instance.format('DD/MM/YYYY')
}

export const timeFormatting = (date) =>
  moment(date)
    .utcOffset('+07:00')
    .format('H:mm')

export const dateTimeFormatting = (str) => {
  const timestamp = Number(str)
  const date = new Date(Number.isNaN(timestamp) ? str : timestamp)

  return `${dateFormatting(date)} ${timeFormatting(date)}`
}
