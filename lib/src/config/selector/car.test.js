import { getTotalPrice } from './car'

describe('getTotalPrice', () => {
  describe('when has topup', () => {
    it('return price with topup', () => {
      const product = {
        topup: 0.2,
        price: 10,
      }
      const result = getTotalPrice(product)

      expect(result).toEqual(8)
    })
  })
  describe('when no topup', () => {
    it('return price without topup', () => {
      const product = {
        price: 10,
      }
      const result = getTotalPrice(product)

      expect(result).toEqual(10)
    })
  })
  describe('when has topup and discount', () => {
    it('return price with topup and discount', () => {
      const product = {
        addition: {
          has_cctv: true,
        },
        topup: 0.2,
        price: 10,
      }
      const result = getTotalPrice(product)

      expect(result).toEqual(7.5)
    })
  })
  describe('when has topup and buy car act', () => {
    it('return price with topup and add 599', () => {
      const product = {
        addition: {
          is_buy_car_act: true,
        },
        topup: 0.9,
        price: 10,
      }
      const result = getTotalPrice(product)

      expect(result).toEqual(600)
    })
  })
  describe('when no topup and no price', () => {
    it('return null', () => {
      const product = {}
      const result = getTotalPrice(product)

      expect(result).toEqual(undefined)
    })
  })
})
