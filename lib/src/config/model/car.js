import * as fp from 'lodash/fp'

import {
  isName,
  isNotEmpty,
  isDate,
  isNumeric,
  isThaiNationalId,
} from 'validation'

import { ONCE, MONTHLY, YEARLY } from 'constants/payment'
import { createModel } from 'utils/model'
import getMasterData from 'services/masterdata'
import callMiddleware from 'services/middleware'
import i18n from 'i18n'

export const car = createModel({
  base: 'data.car',
  fields: {
    brand: {
      path: 'brand',
      label: 'car:car.brand.label',
      placeholder: 'car:car.brand.placeholder',
      type: 'select',
      required: true,
      dependencies: {
        suggestion: ({ session, token }) =>
          getMasterData('masterdata.car.suggestBrand', {
            data: {
              brand: fp.get(car.fields.brand.field, session),
            },
            token,
            session,
          }),
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listBrand', {
            token,
            session,
          }),
      },
    },
    model: {
      path: 'model',
      label: 'car:car.model.label',
      placeholder: 'car:car.model.placeholder',
      type: 'select',
      required: true,
      dependencies: {
        context: (session) =>
          fp.applySpec({
            brand: fp.get(car.fields.brand.field),
          })(session),
        suggestion: ({ session, token }) =>
          getMasterData('masterdata.car.suggestModel', {
            data: {
              brand: fp.get(car.fields.brand.field, session),
              model: fp.get(car.fields.model.field, session),
            },
            token,
            session,
          }),
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listModel', {
            data: {
              brand: fp.get(car.fields.brand.field, session),
            },
            token,
            session,
          }),
      },
    },
    year: {
      path: 'year',
      label: 'car:car.year.label',
      placeholder: 'car:car.year.placeholder',
      type: 'select',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      dependencies: {
        context: (session) =>
          fp.applySpec({
            brand: fp.get(car.fields.brand.field),
            model: fp.get(car.fields.model.field),
          })(session),
        suggestion: ({ session, token }) =>
          getMasterData('masterdata.car.suggestYear', {
            data: {
              brand: fp.get(car.fields.brand.field, session),
              model: fp.get(car.fields.model.field, session),
              year: fp.get(car.fields.year.field, session),
            },
            token,
            session,
          }),
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listYear', {
            data: {
              brand: fp.get(car.fields.brand.field, session),
              model: fp.get(car.fields.model.field, session),
            },
            token,
            session,
          }),
      },
    },
    province: {
      path: 'province',
      label: 'car:car.province.label',
      placeholder: 'car:car.province.placeholder',
      type: 'select',
      required: true,
      dependencies: {
        suggestion: ({ session, token }) =>
          getMasterData('masterdata.car.suggestProvince', {
            data: {
              language: session.language,
              province: fp.get(car.fields.province.field, session),
            },
            token,
            session,
          }),
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listProvince', {
            data: {
              language: session.language,
            },
            token,
            session,
          }),
      },
    },
    id: {
      path: 'id',
      label: 'car:car.id.label',
      placeholder: 'car:car.id.placeholder',
      type: 'text',
      required: true,
    },
    chassis_number: {
      path: 'chassis_number',
      label: 'car:car.chassis_number.label',
      placeholder: 'car:car.chassis_number.placeholder',
      type: 'text',
      required: true,
    },
  },
})

export const insured = createModel({
  base: 'data.insured',
  fields: {
    name: {
      path: 'name',
      label: 'car:insured.name.label',
      placeholder: 'car:insured.name.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_name',
          validate: isName,
        },
      ],
    },
    national_id: {
      path: 'national_id',
      label: 'car:insured.national_id.label',
      placeholder: 'car:insured.national_id.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
        // {
        //   message: 'validation:error.invalid_thai_national_id',
        //   validate: isThaiNationalId,
        // },
      ],
    },
    dob: {
      path: 'dob',
      label: 'car:insured.dob.label',
      placeholder: 'car:insured.dob.placeholder',
      type: 'date',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_date',
          validate: isDate,
        },
      ],
    },
    delivery_location: {
      path: 'delivery_location',
      label: 'car:insured.delivery_location.label',
      placeholder: 'car:insured.delivery_location.placeholder',
      type: 'textarea',
      required: true,
    },
    job: {
      path: 'job',
      label: 'car:insured.job.label',
      placeholder: 'car:insured.job.placeholder',
      type: 'text',
    },
  },
})

export const attachment = createModel({
  base: 'attachment',
  fields: {
    car_front: {
      path: 'car_front',
      label: 'attachment:car_front',
      type: 'image',
      required: true,
    },
    car_back: {
      path: 'car_back',
      label: 'attachment:car_back',
      type: 'image',
      required: true,
    },
    car_left: {
      path: 'car_left',
      label: 'attachment:car_left',
      type: 'image',
      required: true,
    },
    car_right: {
      path: 'car_right',
      label: 'attachment:car_right',
      type: 'image',
      required: true,
    },
    car_registration: {
      path: 'car_registration',
      label: 'attachment:car_registration',
      type: 'image',
      required: true,
    },
    national_id: {
      path: 'national_id',
      label: 'attachment:national_id',
      type: 'image',
      required: true,
    },
  },
})

export const carProduct = createModel({
  base: 'data.product.car',
  dependencies: {
    suggestion: ({ session, token, data }) =>
      getMasterData('masterdata.car.suggestProduct', {
        data,
        token,
        session,
      }),
    list: async ({ session, token, action }) => {
      const { productFilter } = action.args[0]

      const result = await getMasterData('masterdata.car.suggestProduct', {
        data: productFilter,
        token,
        session,
      })

      return result
    },
  },
  enable: fp.allPass([car.validate]),
  fields: {
    id: {
      path: 'id',
      label: 'car:product.id',
      required: true,
      dependencies: {
        context: (session) => fp.get(carProduct.fields.id.field, session),
        list: async ({ token, session, action }) => {
          const result = await getMasterData('masterdata.car.getProduct', {
            data: {
              id:
                fp.get('args[0]', action) ||
                fp.get(carProduct.fields.id.field, session),
            },
            token,
            session,
          })

          return result
        },
      },
    },
    type: {
      path: 'type',
      label: 'car:product.type',
      dependencies: {
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listProductType', {
            token,
            session,
          }),
      },
    },
    price: {
      path: 'price',
      label: 'car:product.price',
    },
    topup: {
      path: 'topup',
      label: 'car:product.topup',
    },
    commission_percent: {
      path: 'commission_percent',
      label: 'car:product.commission_percent',
    },
    brand: {
      path: 'brand',
      label: 'car:product.brand',
      dependencies: {
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listProductBrand', {
            token,
            session,
          }),
      },
    },
    repair_type: {
      path: 'car_coverage.repair_type',
      label: 'car:product.repair_type',
      dependencies: {
        list: ({ session, token }) =>
          getMasterData('masterdata.car.listProductRepairType', {
            token,
            session,
          }),
      },
    },
  },
})

export const addition = createModel({
  base: 'data.product.car',
  fields: {
    has_cctv: {
      path: 'addition.has_cctv',
      label: 'car:addition.has_cctv.text',
      type: 'checkbox',
    },
    is_buy_car_act: {
      path: 'addition.is_buy_car_act',
      label: 'car:addition.buy_car_act.text',
      type: 'checkbox',
    },
    has_first_driver: {
      path: 'addition.has_first_driver',
      label: 'car:addition.first_driver',
      type: 'checkbox',
    },
    first_driver_name: {
      path: 'addition.first_driver.name',
      label: 'car:addition.first_driver_name.label',
      placeholder: 'car:addition.first_driver_name.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_first_driver.field, session) === true,
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_name',
          validate: isName,
        },
      ],
    },
    first_driver_dob: {
      path: 'addition.first_driver.dob',
      label: 'car:addition.first_driver_dob.label',
      placeholder: 'car:addition.first_driver_dob.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_first_driver.field, session) === true,
      type: 'date',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_date',
          validate: isDate,
        },
      ],
    },
    first_driver_job: {
      path: 'addition.first_driver.job',
      label: 'car:addition.first_driver_job.label',
      placeholder: 'car:addition.first_driver_job.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_first_driver.field, session) === true,
      type: 'text',
    },
    has_second_driver: {
      path: 'addition.has_second_driver',
      label: 'car:addition.second_driver',
      type: 'checkbox',
    },
    second_driver_name: {
      path: 'addition.second_driver.name',
      label: 'car:addition.second_driver_name.label',
      placeholder: 'car:addition.second_driver_name.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_second_driver.field, session) === true,
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_name',
          validate: isName,
        },
      ],
    },
    second_driver_dob: {
      path: 'addition.second_driver.dob',
      label: 'car:addition.second_driver_dob.label',
      placeholder: 'car:addition.second_driver_dob.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_second_driver.field, session) === true,
      type: 'date',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_date',
          validate: isDate,
        },
      ],
    },
    second_driver_job: {
      path: 'addition.second_driver.job',
      label: 'car:addition.second_driver_job.label',
      placeholder: 'car:addition.second_driver_job.placeholder',
      enable: ({ session }) =>
        fp.get(addition.fields.has_second_driver.field, session) === true,
      type: 'text',
    },
  },
})

export const application = createModel({
  base: 'data.application.car',
  dependencies: {
    list: async ({ session, token }) => {
      const result = await callMiddleware('application.car.generatePDF', {
        token,
        data: {
          sessionId: session.id,
          type: 'image/jpeg',
        },
        responseType: 'blob',
      })

      return URL.createObjectURL(new Blob([result]))
    },
  },
  fields: {
    status: {
      path: 'status',
    },
    type: {
      path: 'type',
    },
  },
})

export const payment = createModel({
  base: 'data.payment.car',
  dependencies: {
    list: ({ session, token }) =>
      Promise.all(
        fp.pipe(
          fp.get(payment.fields.transactions.field),
          fp.map((transactionId) =>
            callMiddleware('payment.get', {
              token,
              data: {
                sessionId: session.id,
                transactionId,
              },
            })
          )
        )(session)
      ),
  },
  enable: fp.allPass([
    insured.validate,
    car.validate,
    carProduct.validate,
    addition.validate,
    attachment.validate,
  ]),
  fields: {
    transactions: {
      path: 'transactions',
    },
    mode: {
      dependencies: {
        list: async ({ session }) => {
          const { language } = session
          return [
            {
              label: i18n().getFixedT(language)('payment:mode.once'),
              value: ONCE,
            },
            {
              label: i18n().getFixedT(language)('payment:mode.monthly'),
              value: MONTHLY,
            },
            {
              label: i18n().getFixedT(language)('payment:mode.yearly'),
              value: YEARLY,
            },
          ]
        },
      },
      path: 'mode',
    },
  },
})
