import axios from 'axios'
import * as fp from 'lodash/fp'

export const instance = axios.create({
  baseURL: process.env.GATEWAY_URL,
})

export const labeling = (lang) =>
  fp.when(fp.anyPass([fp.isPlainObject, fp.all(fp.isPlainObject)]), (data) =>
    fp.traverse(
      fp.when(
        fp.pipe(
          fp.nthArg(1),
          fp.last,
          fp.isEqual('label')
        ),
        fp.when(fp.has(lang), fp.get(lang))
      ),
      undefined,
      fp.ifElse(fp.isArray, fp.constant([]), fp.constant({}))(data)
    )(data))

export default async (name, {
  session, data, token, method = 'post', ...config
} = {}) => {
  const language = session.language || 'th'

  if (process.browser || token) {
    const response = await instance({
      url: name,
      data: { language, ...data },
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...config,
    })

    return labeling(language)(response.data)
  }

  return labeling(language)(await global.broker.call(name, { language, ...data }))
}
