import { numberFormatting, dateTimeFormatting } from './format'

describe('numberFormatting', () => {
  describe('when undefined', () => {
    it('return -', () => {
      expect(numberFormatting()).toEqual(' - ')
    })
  })
  describe('when 0', () => {
    it('return 0', () => {
      expect(numberFormatting(0)).toEqual('0.00')
    })
  })
  describe('when 1000', () => {
    it('return 1,000', () => {
      expect(numberFormatting(1000)).toEqual('1,000.00')
    })
  })
  describe('when 1000.00', () => {
    it('return 1,000', () => {
      expect(numberFormatting(1000.00)).toEqual('1,000.00')
    })
  })
})

describe('dateTimeFormatting', () => {
  it('return string', () => {
    expect(dateTimeFormatting('0')).toEqual('01/01/2513 7:00')
  })
})
