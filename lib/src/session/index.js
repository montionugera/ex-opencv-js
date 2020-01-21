import * as fp from 'lodash/fp'
import NodeCache from 'node-cache'

import { carProduct } from 'config/model/car'
import { healthProduct } from 'config/model/health'
import constant from 'config/constant'
import redis from '../redis'

export const Session = redis.model('session', {
  idGenerator() {
    return this.property('id')
  },
  properties: {
    id: {
      type: 'string',
    },
    data: {
      type: 'json',
      defaultValue: {},
    },
    attachment: {
      type: 'json',
      defaultValue: {},
    },
    ownerId: {
      type: 'string',
      defaultValue: '',
      index: true,
    },
    customerId: {
      type: 'string',
      defaultValue: '',
      index: true,
    },
    owner: {
      type: 'json',
      defaultValue: {},
    },
    module: {
      type: 'string',
      defaultValue: '',
    },
    intent: {
      type: 'json',
      defaultValue: {},
    },
    status: {
      type: 'string',
      defaultValue: '',
    },
    language: {
      type: 'string',
      defaultValue: 'th',
    },
    createdAt: {
      type: 'timestamp',
    },
    updatedAt: {
      type: 'timestamp',
    },
  },
})

export const cache = new NodeCache({
  stdTTL: constant.CACHE_TTL_SECOND,
  checkperiod: constant.CACHE_CHECK_TTL_SECOND,
  useClones: false,
})

export const loadSession = async (sid) => {
  try {
    const result = await redis.factory('session', sid)

    cache.set(sid, result)

    return result.allProperties()
  } catch (err) {
    return null
  }
}

export const getSession = (sid) => cache.get(sid)

export const setSession = async (sid, props) => {
  const result = await getSession(sid)
  result.property({
    ...props,
    updatedAt: Date.now(),
  })
  await result.save({ silent: true })

  return result.allProperties()
}

export const deleteSession = async (sid) => {
  try {
    const result = getSession(sid) || (await redis.factory('session', sid))
    if (result) {
      await result.remove({
        silent: true,
      })
    }
    if (cache.has(sid)) {
      cache.del(sid)
    }
  } catch (err) {}
}

export const createSession = async (props, create = () => Promise.resolve({})) => {
  let result
  try {
    result = await redis.factory('session', props.id)
  } catch (err) {
    const defaultProps = await create()
    if (!fp.isNil(defaultProps)) {
      result = await redis.factory('session')
      result.property({
        ...props,
        ...defaultProps,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
      await result.save({ silent: true })
    }
  }

  if (result) {
    cache.set(props.id, result)
  }

  return result
}

export const findSession = async (props) => {
  try {
    const result = await Session.loadMany(await Session.find(props))

    return fp.map((session) => session.allProperties(), result)
  } catch (err) {
    return null
  }
}

export const copySession = async (srcId, destId, selector = fp.identity) => {
  await loadSession(srcId)

  const session = getSession(srcId).allProperties()

  const result = await setSession(destId, fp.omit(['id'], selector(session)))

  return result
}

export const loadDependencies = async (sid) => {
  const session = getSession(sid).allProperties()

  let result = session

  if (fp.has(carProduct.fields.id.field, session)) {
    const product = await carProduct.fields.id.dependencies.list({ session })

    result = fp.update(carProduct.base, fp.assign(product), result)
  }

  if (fp.has(healthProduct.fields.plan_id.field, session)) {
    const product = await healthProduct.fields.plan_id.dependencies.list({ session })

    result = fp.update(healthProduct.base, fp.assign(product), result)
  }

  return result
}

export const generateSessionId = fp.pipe(
  fp.prop('source'),
  fp.props(['roomId', 'groupId']),
  fp.reject(fp.isNil),
  fp.join('_')
)

export default {
  hasSession: (sid) => !fp.isNil(getSession(sid)),
  getSession: (sid, { includeAttachment = true } = {}) =>
    fp.omit(includeAttachment ? [] : ['attachment'], getSession(sid).allProperties()),
  getIntent: (sid) => getSession(sid).property('intent'),
  getData: (sid) => getSession(sid).property('data'),
  getAttachment: (sid) => getSession(sid).property('attachment'),
  getStatus: (sid) => getSession(sid).property('status'),
  getModule: (sid) => getSession(sid).property('module'),
  getOwner: (sid) => getSession(sid).property('owner'),
  getOwnerId: (sid) => getSession(sid).property('ownerId'),
  getCustomerId: (sid) => getSession(sid).property('customerId'),
  getLanguage: (sid) => getSession(sid).property('language'),
  getUpdatedAt: (sid) => getSession(sid).property('updatedAt'),
  getCreatedAt: (sid) => getSession(sid).property('createdAt'),
  isCustomer: (sid, userId) => {
    if (fp.isNil(userId)) return true

    const customerId = getSession(sid).property('customerId')

    return customerId === userId
  },
  isOwner: (sid, userId) => {
    if (fp.isNil(userId)) return true

    const ownerId = getSession(sid).property('ownerId')

    return ownerId === userId
  },
}
