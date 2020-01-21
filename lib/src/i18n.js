import * as fp from 'lodash/fp'
import i18next from 'i18next'

import i18nConfig from 'config/i18n'

let i18n = i18next.createInstance()

export const createInstance = () => i18next.createInstance()

export const cloneInstance = () => i18n.cloneInstance()

export const isI18nKey = (text) =>
  fp.isString(text) && fp.any((prefix) => fp.startsWith(`${prefix}:`, text), i18nConfig.ns)

export const initI18n = async ({ plugins = [], config = i18nConfig } = {}) => {
  let backend
  let backendConfig = config.backend

  if (process.browser) {
    backend = (await import('i18next-xhr-backend')).default
  } else {
    const path = (await import('path')).default

    backend = (await import('i18next-node-fs-backend')).default
    backendConfig = fp.assign(config.backend, {
      loadPath: config.backend.loadPath.startsWith('/')
        ? config.backend.loadPath
        : path.join(__dirname, '../', config.backend.loadPath),
    })
  }

  await new Promise((resolve, reject) => {
    plugins.forEach((plugin) => {
      i18n = i18n.use(plugin)
    })

    i18n.use(backend).init(
      {
        ...config,
        lng: config.fallbackLng,
        preload: config.whitelist,
        backend: backendConfig,
      },
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })

  return i18n
}

export default (lng) => {
  if (lng) {
    i18n.changeLanguage(lng)
  }
  return i18n
}
