import * as fp from 'lodash/fp'

import {
  ASK_CAR,
  ASK_CAR_IMAGES,
  ASK_CAR_REGISTRATION_IMAGES,
  DONE_CAR_IMAGES,
  DONE_CAR_REGISTRATION_IMAGES,
  RECOMMEND_CAR_INSUR_PRODUCT,
  SHOW_CAR_INSUR_PRODUCT,
  SELECT_CAR_INSUR_PRODUCT,
  ASK_CAR_APPLICATION,
  SHOW_CAR_PAYMENT,
  ASK_CAR_ADDITION,
} from 'constants/command'

import { getCarProductInfo } from 'config/selector/car'

import text from 'config/template/text'
import carInsur from 'config/template/car-insur'
import carInsurPayment from 'config/template/car-insur-payment'
import reqCarImages from 'config/template/req-car-images'
import reqCarRegistrationImage from 'config/template/req-car-registration-image'

export default {
  [ASK_CAR]: {
    meta: {
      message: text(ASK_CAR),
    },
  },
  [ASK_CAR_ADDITION]: {
    meta: {
      message: text(ASK_CAR_ADDITION),
    },
  },
  [ASK_CAR_IMAGES]: {
    meta: {
      message: ({ session }) => {
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'req-car-images')

        return reqCarImages({
          title: 'attachment:req_car_images.info',
          ok: 'common:capture_image',
          url: url.href,
        })
      },
    },
  },
  [ASK_CAR_REGISTRATION_IMAGES]: {
    meta: {
      message: ({ session }) => {
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'req-car-registration')

        return reqCarRegistrationImage({
          title: 'attachment:req_car_registration_image.info',
          ok: 'common:capture_image',
          url: url.href,
        })
      },
    },
  },
  [DONE_CAR_IMAGES]: {
    meta: {
      message: text('attachment:req_car_images.done'),
    },
  },
  [DONE_CAR_REGISTRATION_IMAGES]: {
    meta: {
      message: text('attachment:req_car_registration_image.done'),
    },
  },
  [RECOMMEND_CAR_INSUR_PRODUCT]: {
    meta: {
      message: [
        text('common:recommend_package'),
        ({ session, action }) => {
          const url = new URL(process.env.LIFF_CLIENT_URL)

          url.searchParams.set('sessionId', session.id)
          url.searchParams.set('type', session.data.insurance_type)
          url.searchParams.set('language', session.language)
          url.searchParams.set('path', 'view-car-insur-detail')

          const products = action.args[0] || []

          return fp.pipe(
            fp.chunk(10),
            fp.map((chunkedProducts) =>
              carInsur({
                title: 'common:recommend_package',
                productInfos: fp.map(getCarProductInfo, chunkedProducts),
                url: url.href,
              }))
          )(products)
        },
      ],
    },
  },
  [SHOW_CAR_INSUR_PRODUCT]: {
    meta: {
      message: ({ session, action }) => {
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'view-car-insur-detail')

        const product = action.args[0]

        return carInsur({
          title: 'common:recommend_package',
          productInfos: [getCarProductInfo(product)],
          url: url.href,
        })
      },
    },
  },
  [SELECT_CAR_INSUR_PRODUCT]: {
    meta: {
      message: [
        text('common:select_package'),
        ({ session, action }) => {
          const url = new URL(process.env.LIFF_CLIENT_URL)

          url.searchParams.set('sessionId', session.id)
          url.searchParams.set('type', session.data.insurance_type)
          url.searchParams.set('language', session.language)
          url.searchParams.set('path', 'view-car-insur-detail')

          const product = action.args[0]

          return carInsur({
            title: 'common:select_package',
            productInfos: [getCarProductInfo(product)],
            url: url.href,
          })
        },
      ],
    },
  },
  [ASK_CAR_APPLICATION]: {
    meta: {
      message: text(ASK_CAR_APPLICATION),
    },
  },
  [SHOW_CAR_PAYMENT]: {
    meta: {
      message: ({ session, action }) => {
        const product = action.args[0]
        const url = new URL(process.env.LIFF_CLIENT_URL)

        url.searchParams.set('sessionId', session.id)
        url.searchParams.set('type', session.data.insurance_type)
        url.searchParams.set('language', session.language)
        url.searchParams.set('path', 'view-payment')

        return carInsurPayment({
          title: 'common:open_payment',
          productInfo: getCarProductInfo(product),
          url: url.href,
        })
      },
    },
  },
}
