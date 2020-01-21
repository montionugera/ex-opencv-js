import * as fp from 'lodash/fp'
import axios from 'axios'
import http from 'http'
import i18n, { initI18n } from './i18n'

describe('i18n', () => {
  describe('when initI18n', () => {
    beforeAll(async () => {
      await initI18n()
    })
    it('can get i18n', () => {
      expect(i18n('th')).not.toBeUndefined()
    })
    it('can get default i18n', () => {
      expect(i18n()).not.toBeUndefined()
    })
  })
  describe('when translate', () => {
    beforeAll(async () => {
      await initI18n({ force: true })
    })
    it('can translate', () => {
      expect(i18n('en').t('common:yes')).toEqual('Yes')
    })
  })
  describe('when change language', () => {
    beforeAll(async () => {
      await initI18n({ force: true })
    })
    it('can translate', () => {
      expect(i18n().t('common:accept')).toEqual('ยอมรับ')
      i18n().changeLanguage('en')
      expect(i18n().t('common:accept')).toEqual('Accept')
      i18n().changeLanguage('th')
      expect(i18n().t('common:accept')).toEqual('ยอมรับ')
    })
  })
  describe('when has dynamic key', () => {
    beforeAll(async () => {
      await initI18n()
    })
    it('can translate', () => {
      expect(i18n().t('validation:error.empty', { type: 'image' })).toEqual('กรุณาถ่ายภาพ')
    })
  })

  describe('when has dynamic key', () => {
    beforeAll(async () => {
      await initI18n()
    })
    it('can translate', () => {
      expect(i18n().t('validation:error.empty', { type: 'image' })).toEqual('กรุณาถ่ายภาพ')
    })
  })

  describe('when parallel', () => {
    const port = 8081
    const server = http.createServer((request, response) => {
      const language = request.url.replace('/?language=', '')
      response.end(i18n(language).t('common:accept'))
    })

    beforeAll(async () => {
      await initI18n()

      await new Promise((resolve, reject) => {
        server.listen(port, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    })

    afterAll(async () => {
      await new Promise((resolve) => server.close(resolve))
    })

    it('can translate', async () => {
      const url = `http://localhost:${port}`
      const response = await Promise.all([
        await axios.get(url, { params: { language: 'en' } }),
        await axios.get(url, { params: { language: 'th' } }),
        await axios.get(url, { params: { language: 'en' } }),
        await axios.get(url, { params: { language: 'th' } }),
      ])

      const result = fp.map(fp.get('data'), response)
      expect(result).toEqual(['Accept', 'ยอมรับ', 'Accept', 'ยอมรับ'])
    })
  })
})
