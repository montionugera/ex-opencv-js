import {
  ASK_HEALTH_QUESTION,
  DONE_HEALTH_QUESTION,
  RECOMMEND_HEALTH_INSUR_PRODUCT,
  SHOW_HEALTH_INSUR_PRODUCT,
  SELECT_HEALTH_INSUR_PRODUCT,
  ASK_HEALTH_APPLICATION,
  SHOW_HEALTH_PAYMENT,
} from 'constants/command'

import { getHealthProductInfo, getPremium } from 'config/selector/health'

import text from 'config/template/text'
import reqHealthQuestion from 'config/template/req-health-question'
import healthInsur from 'config/template/health-insur'
import healthInsurGroup from 'config/template/health-insur-group'
import healthPayment from 'config/template/health-insur-payment'

export default {
  [ASK_HEALTH_QUESTION]: {
    meta: {
      message: ({ session }) => {
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'view-health-question')

        return reqHealthQuestion({
          title: 'health:health.info',
          ok: 'health:health.answer',
          url: url.href,
        })
      },
    },
  },
  [DONE_HEALTH_QUESTION]: {
    meta: {
      message: text('health:health.done'),
    },
  },
  [RECOMMEND_HEALTH_INSUR_PRODUCT]: {
    meta: {
      message: [
        text('common:recommend_package'),
        ({ session, action }) => {
          const url = new URL(process.env.LIFF_CLIENT_URL)

          url.searchParams.set('sessionId', session.id)
          url.searchParams.set('type', session.data.insurance_type)
          url.searchParams.set('language', session.language)
          url.searchParams.set('path', 'view-health-insur-detail')

          const product = action.args[0]

          return healthInsurGroup({
            title: 'common:recommend_package',
            product,
            url: url.href,
          })
        },
      ],
    },
  },
  [SHOW_HEALTH_INSUR_PRODUCT]: {
    meta: {
      message: ({ session, action }) => {
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'view-health-insur-detail')

        const product = action.args[0]

        return healthInsur({
          title: 'common:recommend_package',
          product: getHealthProductInfo(product),
          totalPrice: getPremium(product, { session }),
          url: url.href,
        })
      },
    },
  },
  [SELECT_HEALTH_INSUR_PRODUCT]: {
    meta: {
      message: [
        text('common:select_package'),
        ({ session, action }) => {
          const url = new URL(process.env.LIFF_CLIENT_URL)

          url.searchParams.set('sessionId', session.id)
          url.searchParams.set('type', session.data.insurance_type)
          url.searchParams.set('language', session.language)
          url.searchParams.set('path', 'view-health-insur-detail')

          const product = action.args[0]

          return healthInsur({
            title: 'common:select_package',
            product: getHealthProductInfo(product),
            totalPrice: getPremium(product, { session }),
            url: url.href,
          })
        },
      ],
    },
  },
  [ASK_HEALTH_APPLICATION]: {
    meta: {
      message: text(ASK_HEALTH_APPLICATION),
    },
  },
  [SHOW_HEALTH_PAYMENT]: {
    meta: {
      message: ({ session, action }) => {
        const product = action.args[0]
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'view-payment')

        return healthPayment({
          title: 'common:open_payment',
          product: getHealthProductInfo(product),
          totalPrice: getPremium(product, { session }),
          url: url.href,
        })
      },
    },
  },
}
