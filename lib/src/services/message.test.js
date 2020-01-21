import text from 'config/template/text'
import { initI18n } from 'i18n'

import getMessageTemplte from './message'

describe('', () => {
  beforeAll(async () => {
    await initI18n()
  })
  describe('when message is template', () => {
    it('return array', () => {
      const config = {
        session: {
          language: 'en',
        },
      }
      const message = text(['common:correct', 'common:deny'])
      const result = getMessageTemplte(config)(message)

      expect(result).toEqual([text('Correct Deny')])
    })
  })
  describe('when message is function', () => {
    it('return array', () => {
      const config = {
        action: 'action',
        event: 'event',
        session: {
          language: 'en',
        },
        dependencies: 'dependencies',
      }
      const message = (args) => [args, args]
      const result = getMessageTemplte(config)(message)

      expect(result).toEqual([
        {
          action: 'action',
          event: 'event',
          session: {
            language: 'en',
          },
          dependencies: 'dependencies',
        },
        {
          action: 'action',
          event: 'event',
          session: {
            language: 'en',
          },
          dependencies: 'dependencies',
        },
      ])
    })
    describe('when message is array of function and template', () => {
      it('return array', () => {
        const config = {
          action: 'action',
          event: 'event',
          session: {
            language: 'en',
          },
          dependencies: 'dependencies',
        }
        const message = [text('common:deny'), (args) => args, () => null]
        const result = getMessageTemplte(config)(message)

        expect(result).toEqual([
          text('Deny'),
          {
            action: 'action',
            event: 'event',
            session: {
              language: 'en',
            },
            dependencies: 'dependencies',
          },
        ])
      })
    })
  })
})
