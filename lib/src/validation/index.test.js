import { initI18n } from "../i18n"
import { isAnswer, isEnglish, isThai, isName, isNumeric, isNotEmpty, isDate } from './index'

describe('validation', () => {
  describe('isAnswer', () => {
    beforeAll(async () => {
      await initI18n()
    })

    it('when valid', () => {
      const result = isAnswer('common:yes')('Yes', { language: 'en' })

      expect(result).toEqual(true)
    })

    it('when invalid', () => {
      const result = isAnswer('common:yes')('No', { language: 'en' })

      expect(result).toEqual(false)
    })
  })

  describe('isNotEmpty', () => {
    it('when not empty', () => {
      const result = isNotEmpty('hi!')

      expect(result).toEqual(true)
    })

    it('when empty', () => {
      const result = isNotEmpty('')

      expect(result).toEqual(false)
    })

    it('when NaN', () => {
      const result = isNotEmpty(NaN)

      expect(result).toEqual(false)
    })

    it('when null', () => {
      const result = isNotEmpty(null)

      expect(result).toEqual(false)
    })

    it('when undefined', () => {
      const result = isNotEmpty(undefined)

      expect(result).toEqual(false)
    })
  })

  describe('isEnglish', () => {
    it('when English', () => {
      const result = isEnglish('John Smith')

      expect(result).toEqual(true)
    })

    it('when invalid', () => {
      const result = isEnglish('Hello !@#$')

      expect(result).toEqual(false)
    })
  })

  describe('isThai', () => {
    it('when Thai', () => {
      const result = isThai('ชานน กลม')

      expect(result).toEqual(true)
    })

    it('when invalid', () => {
      const result = isThai('Johhhn')

      expect(result).toEqual(false)
    })
  })

  describe('isName', () => {
    it('when name is in Thai', () => {
      const result = isName('ชานน กลม')

      expect(result).toEqual(true)
    })

    it('when name is in Engligh', () => {
      const result = isName('John Smith')

      expect(result).toEqual(true)
    })

    it('when name is in Engligh (with middle name)', () => {
      const result = isName('Mary L. Bianchi')

      expect(result).toEqual(true)
    })

    it('when name is empty String', () => {
      const result = isName('')

      expect(result).toEqual(true)
    })
  })

  describe('isNumeric', () => {
    it('when receive as string', () => {
      const result = isNumeric('1234')

      expect(result).toEqual(true)
    })

    it('when receive as number', () => {
      const result = isNumeric(1234)

      expect(result).toEqual(true)
    })

    it('when receive 0', () => {
      const result = isNumeric(0)

      expect(result).toEqual(true)
    })

    it('when invalid', () => {
      const result = isNumeric('$123')

      expect(result).toEqual(false)
    })
  })

  describe('isDate', () => {
    it('when receive 2019-04-20', () => {
      const result = isDate('2019-04-20')

      expect(result).toEqual(true)
    })

    it('when receive 2019/04/20', () => {
      const result = isDate('2019/04/20')

      expect(result).toEqual(false)
    })

    it('when receive text', () => {
      const result = isDate('ไม่รู้')

      expect(result).toEqual(false)
    })

    it('when receive number', () => {
      const result = isDate(12)

      expect(result).toEqual(false)
    })

    it('when receive string', () => {
      const result = isDate('12')

      expect(result).toEqual(false)
    })
  })
})
