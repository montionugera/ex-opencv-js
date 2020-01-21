import * as fp from 'lodash/fp'
import session, {
  findSession,
  deleteSession,
  createSession,
  loadSession,
  generateSessionId,
  cache,
  copySession,
} from './index'
import { connect, disconnect } from '../redis'

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

describe('session', () => {
  const id = 'foo'

  beforeAll(async () => {
    await connect()
    jest.spyOn(Date, 'now').mockImplementation(() => 0)
  })
  afterAll(async () => {
    await deleteSession(id)
    await disconnect()
    Date.now.mockRestore()
  })
  describe('generateSessionId', () => {
    it('return with user id', () => {
      const id = generateSessionId({
        source: {
          userId: 'userId',
        },
      })
      expect(id).toEqual('')
    })
    it('return with user id and room id', () => {
      const id = generateSessionId({
        source: {
          userId: 'userId',
          roomId: 'roomId',
        },
      })
      expect(id).toEqual('roomId')
    })
  })
  describe('when create', () => {
    it('create default data', async () => {
      await createSession({ id })

      const result = session.getSession(id)

      expect(cache.has(id)).toEqual(true)
      expect(result).toEqual({
        id,
        data: {},
        attachment: {},
        owner: {},
        ownerId: '',
        customerId: '',
        intent: {},
        module: '',
        status: '',
        language: 'th',
        createdAt: '0',
        updatedAt: '0',
      })
    })
    describe('when pass creator', () => {
      beforeEach(async () => {
        await deleteSession(id)
      })
      afterEach(async () => {
        await deleteSession(id)
      })
      describe('when creator return null', () => {
        it('not create data', async () => {
          await createSession({ id }, async () => null)

          expect(cache.has(id)).toEqual(false)
          expect(() => session.getSession(id)).toThrow()
        })
      })
      describe('when creator return owner', () => {
        it('create default data with owner', async () => {
          await createSession({ id }, async () => ({
            owner: { name: 'foo' },
            ownerId: '',
            customerId: '',
          }))

          const result = session.getSession(id)

          expect(cache.has(id)).toEqual(true)
          expect(result).toEqual({
            id,
            data: {},
            attachment: {},
            owner: { name: 'foo' },
            ownerId: '',
            customerId: '',
            intent: {},
            module: '',
            status: '',
            language: 'th',
            createdAt: '0',
            updatedAt: '0',
          })
        })
      })
    })
  })
  describe('when get', () => {
    beforeEach(async () => {
      await createSession({ id })
    })
    afterEach(async () => {
      await deleteSession(id)
    })
    it('include attachment', async () => {
      expect(session.getSession(id)).toEqual({
        id,
        data: {},
        attachment: {},
        owner: {},
        ownerId: '',
        customerId: '',
        intent: {},
        module: '',
        status: '',
        language: 'th',
        createdAt: '0',
        updatedAt: '0',
      })
    })
    describe('when includeAttachment = false', () => {
      it('not include attachment', async () => {
        expect(session.getSession(id, { includeAttachment: false })).toEqual({
          id,
          data: {},
          owner: {},
          ownerId: '',
          customerId: '',
          intent: {},
          module: '',
          status: '',
          language: 'th',
          createdAt: '0',
          updatedAt: '0',
        })
      })
    })
  })
  describe('when load', () => {
    beforeAll(async () => {
      await createSession({ id })
    })
    afterAll(async () => {
      await deleteSession(id)
    })
    it('return loaded data', async () => {
      await loadSession(id)

      const result = session.getSession(id)

      expect(cache.has(id)).toEqual(true)
      expect(result).toEqual({
        id,
        data: {},
        attachment: {},
        owner: {},
        ownerId: '',
        customerId: '',
        intent: {},
        module: '',
        status: '',
        language: 'th',
        createdAt: '0',
        updatedAt: '0',
      })
    })
  })
  describe('when find', () => {
    beforeAll(async () => {
      await createSession({ id, ownerId: 'ownerId' })
    })
    afterAll(async () => {
      await deleteSession(id)
    })
    it('return loaded data', async () => {
      const result = await findSession({ ownerId: 'ownerId' })

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id,
        data: {},
        attachment: {},
        owner: {},
        ownerId: 'ownerId',
        customerId: '',
        intent: {},
        module: '',
        status: '',
        language: 'th',
        createdAt: '0',
        updatedAt: '0',
      })
    })
  })
  describe('when delete', () => {
    beforeAll(async () => {
      await createSession({ id })
    })
    it('delete all data', async () => {
      await deleteSession(id)
      const result = await loadSession(id)

      expect(result).toBe(null)
      expect(cache.has(id)).toEqual(false)
      expect(() => session.getSession(id)).toThrow()
    })
  })
  describe('when copy', () => {
    beforeAll(async () => {
      await createSession({ id: '1', data: { insured: {}, payer: {} } })
      await createSession({ id: '2' })
    })
    it('copy all data', async () => {
      const result = await copySession('1', '2')
      expect(result.id).toEqual('2')
      expect(result.data).toEqual({
        insured: {},
        payer: {},
      })
    })
    it('copy some data', async () => {
      const result = await copySession('1', '2', fp.update('data', fp.pick(['insured'])))
      expect(result.id).toEqual('2')
      expect(result.data).toEqual({
        insured: {},
      })
    })
  })
  describe('when session expire', () => {
    beforeAll(async () => {
      Date.now.mockRestore()
      await createSession({ id })
    })
    it('remove cache', async () => {
      expect(cache.has(id)).toEqual(true)

      await new Promise((resolve) => {
        cache.on('expired', (key) => {
          if (key === id) {
            resolve()
          }
        })
      })

      expect(cache.has(id)).toEqual(false)
    })
  })
})
