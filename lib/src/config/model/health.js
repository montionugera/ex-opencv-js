import * as fp from 'lodash/fp'

import { isName, isDate, isNumeric, isThaiNationalId } from 'validation'

import { ONCE, MONTHLY, YEARLY } from 'constants/payment'
import { createModel } from 'utils/model'
import getMasterData from 'services/masterdata'
import callMiddleware from 'services/middleware'
import i18n from 'i18n'

export const healthCancer = createModel({
  base: 'data.health.cancer',
  fields: {
    has_excepted_cancer: {
      hidden: true,
      path: 'has_excepted_cancer',
      label: 'health:health.cancer.has_excepted_cancer',
      type: 'checkbox_button',
      required: true,
    },
    excepted_cancer: {
      hidden: true,
      path: 'excepted_cancer.name',
      label: 'health:health.cancer.excepted_cancer.label',
      placeholder: 'health:health.cancer.excepted_cancer.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) =>
        fp.get(healthCancer.fields.has_excepted_cancer.field, session) === true,
    },
    has_cancer: {
      hidden: true,
      path: 'has_cancer',
      label: 'health:health.cancer.has_cancer',
      type: 'checkbox_button',
      required: true,
    },
    cancer: {
      hidden: true,
      path: 'cancer.name',
      label: 'health:health.cancer.cancer.label',
      placeholder: 'health:health.cancer.cancer.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) => fp.get(healthCancer.fields.has_cancer.field, session) === true,
    },
    smoking_history: {
      hidden: true,
      type: 'label',
      label: 'health:health.cancer.smoking_history',
    },
    is_smoking: {
      hidden: true,
      path: 'is_smoking',
      label: 'health:health.cancer.is_smoking',
      type: 'checkbox_button',
      required: true,
    },
    smoking_amount: {
      hidden: true,
      path: 'smoking.amount',
      label: 'health:health.cancer.smoking.amount.label',
      placeholder: 'health:health.cancer.smoking.amount.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      enable: ({ session }) => fp.get(healthCancer.fields.is_smoking.field, session) === true,
    },
    smoking_start: {
      hidden: true,
      path: 'smoking.start',
      label: 'health:health.cancer.smoking.start.label',
      placeholder: 'health:health.cancer.smoking.start.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      enable: ({ session }) => fp.get(healthCancer.fields.is_smoking.field, session) === true,
    },
    smoking_end: {
      hidden: true,
      path: 'smoking.end',
      label: 'health:health.cancer.smoking.end.label',
      placeholder: 'health:health.cancer.smoking.end.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      enable: ({ session }) => fp.get(healthCancer.fields.is_smoking.field, session) === true,
    },
    is_still_smoking: {
      hidden: true,
      path: 'is_still_smoking',
      label: 'health:health.cancer.is_still_smoking',
      type: 'checkbox_button',
      required: true,
    },
    currently_smoking_amount: {
      hidden: true,
      path: 'currently_smoking.amount',
      label: 'health:health.cancer.currently_smoking.amount.label',
      placeholder: 'health:health.cancer.currently_smoking.amount.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      enable: ({ session }) => fp.get(healthCancer.fields.is_still_smoking.field, session) === true,
    },
    disease: {
      hidden: true,
      type: 'label',
      label: 'health:health.cancer.disease',
    },
    has_disease_a: {
      hidden: true,
      path: 'has_disease_a',
      label: 'health:health.cancer.has_disease_a',
      type: 'checkbox_button',
      required: true,
    },
    disease_a_name: {
      hidden: true,
      path: 'disease.a.name',
      label: 'health:health.cancer.disease_a.name.label',
      placeholder: 'health:health.cancer.disease_a.name.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) => fp.get(healthCancer.fields.has_disease_a.field, session) === true,
    },
    has_disease_b: {
      hidden: true,
      path: 'has_disease_b',
      label: 'health:health.cancer.has_disease_b',
      type: 'checkbox_button',
      required: true,
    },
    disease_b_type: {
      hidden: true,
      path: 'disease.b.type',
      label: 'health:health.cancer.disease_b.type.label',
      placeholder: 'health:health.cancer.disease_b.type.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) => fp.get(healthCancer.fields.has_disease_b.field, session) === true,
    },
    disease_b_organ: {
      hidden: true,
      path: 'disease.b.organ',
      label: 'health:health.cancer.disease_b.organ.label',
      placeholder: 'health:health.cancer.disease_b.organ.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) => fp.get(healthCancer.fields.has_disease_b.field, session) === true,
    },
    has_disease_c: {
      hidden: true,
      path: 'has_disease_c',
      label: 'health:health.cancer.has_disease_c',
      type: 'checkbox_button',
      required: true,
    },
    disease_c_type: {
      hidden: true,
      path: 'disease.c.type',
      label: 'health:health.cancer.disease_c.type.label',
      placeholder: 'health:health.cancer.disease_c.type.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) => fp.get(healthCancer.fields.has_disease_c.field, session) === true,
    },
    has_insurance_company: {
      hidden: true,
      path: 'has_insurance_company',
      label: 'health:health.cancer.has_insurance_company',
      type: 'checkbox_button',
      required: true,
    },
    insurance_company_name: {
      hidden: true,
      path: 'insurance_company.name',
      label: 'health:health.cancer.insurance_company.name.label',
      placeholder: 'health:health.cancer.insurance_company.name.placeholder',
      type: 'text',
      required: true,
      enable: ({ session }) =>
        fp.get(healthCancer.fields.has_insurance_company.field, session) === true,
    },
    insurance_company_amount: {
      hidden: true,
      path: 'insurance_company.amount',
      label: 'health:health.cancer.insurance_company.amount.label',
      placeholder: 'health:health.cancer.insurance_company.amount.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
      enable: ({ session }) =>
        fp.get(healthCancer.fields.has_insurance_company.field, session) === true,
    },
  },
})

export const insured = createModel({
  base: 'data.insured',
  fields: {
    name: {
      path: 'name',
      label: 'health:insured.name.label',
      placeholder: 'health:insured.name.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_name',
          validate: isName,
        },
      ],
    },
    gender: {
      path: 'gender',
      label: 'health:insured.gender.label',
      placeholder: 'health:insured.gender.placeholder',
      type: 'select',
      required: true,
      dependencies: {
        list: ({ session, token }) =>
          getMasterData('masterdata.health.listGender', {
            token,
            session,
          }),
      },
    },
    dob: {
      path: 'dob',
      label: 'health:insured.dob.label',
      placeholder: 'health:insured.dob.placeholder',
      type: 'date',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_date',
          validate: isDate,
        },
      ],
    },
    national_id: {
      path: 'national_id',
      label: 'health:insured.national_id.label',
      placeholder: 'health:insured.national_id.placeholder',
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
    current_location: {
      path: 'current_location',
      label: 'health:insured.current_location.label',
      placeholder: 'health:insured.current_location.placeholder',
      type: 'textarea',
      required: true,
    },
    work_location: {
      path: 'work_location',
      label: 'health:insured.work_location.label',
      placeholder: 'health:insured.work_location.placeholder',
      type: 'textarea',
      required: true,
    },
    job: {
      path: 'job',
      label: 'health:insured.job.label',
      placeholder: 'health:insured.job.placeholder',
      type: 'text',
    },
    income_per_month: {
      path: 'income_per_month',
      label: 'health:insured.income_per_month.label',
      placeholder: 'health:insured.income_per_month.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
    },
    height: {
      path: 'height',
      label: 'health:insured.height.label',
      placeholder: 'health:insured.height.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
    },
    weight: {
      path: 'weight',
      label: 'health:insured.weight.label',
      placeholder: 'health:insured.weight.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_number',
          validate: isNumeric,
        },
      ],
    },
  },
})

export const beneficiary = createModel({
  base: 'data.beneficiary',
  fields: {
    name: {
      path: 'name',
      label: 'health:beneficiary.name.label',
      placeholder: 'health:beneficiary.name.placeholder',
      type: 'text',
      required: true,
      validate: [
        {
          message: 'validation:error.invalid_name',
          validate: isName,
        },
      ],
    },
    relationship: {
      path: 'relationship',
      label: 'health:beneficiary.relationship.label',
      placeholder: 'health:beneficiary.relationship.placeholder',
      type: 'text',
      required: true,
    },
    location: {
      path: 'location',
      label: 'health:beneficiary.location.label',
      placeholder: 'health:beneficiary.location.placeholder',
      type: 'textarea',
      required: true,
    },
  },
})

export const attachment = createModel({
  base: 'attachment',
  fields: {
    national_id: {
      path: 'national_id',
      label: 'attachment:national_id',
      type: 'image',
      required: true,
    },
  },
})

export const healthProduct = createModel({
  base: 'data.product.health',
  dependencies: {
    suggestion: ({ session, token, data }) =>
      getMasterData('masterdata.health.suggestProduct', {
        data,
        token,
        session,
      }),
    list: async ({ session, token, action }) => {
      const { productFilter } = action.args[0]

      const result = await getMasterData('masterdata.health.suggestProduct', {
        data: productFilter,
        token,
        session,
      })

      return result
    },
  },
  enable: fp.allPass([healthCancer.validate]),
  fields: {
    id: {
      path: 'id',
      label: 'health:product.id',
      required: true,
      // dependencies: {
      //   list: async ({ token, session, action }) => {
      //     const result = await getMasterData('masterdata.health.getProduct', {
      //       data: {
      //         id: fp.get('args[0]', action) || fp.get(healthProduct.fields.id.field, session),
      //       },
      //       token,
      //       session,
      //     })

      //     return result
      //   },
      // },
    },
    type: {
      path: 'type',
      label: 'health:product.type',
      // dependencies: {
      //   list: ({ session, token }) =>
      //     getMasterData('masterdata.health.listProductType', {
      //       token,
      //       session,
      //     }),
      // },
    },
    plan_id: {
      path: 'plan_id',
      label: 'health:product.plan_id',
      required: true,
      dependencies: {
        context: (session) =>
          fp.applySpec({
            id: fp.get(healthProduct.fields.id.field),
            plan_id: fp.get(healthProduct.fields.plan_id.field),
          })(session),
        list: async ({ token, session, action }) => {
          const result = await getMasterData('masterdata.health.getProductPlan', {
            data: {
              id: fp.get('args[0]', action) || fp.get(healthProduct.fields.id.field, session),
              planId:
                fp.get('args[1]', action) || fp.get(healthProduct.fields.plan_id.field, session),
            },
            token,
            session,
          })

          return result
        },
      },
    },
  },
})

export const application = createModel({
  base: 'data.application.health',
  // dependencies: {
  //   list: async ({ session, token }) => {
  //     const result = await callMiddleware('application.health.generatePDF', {
  //       token,
  //       data: {
  //         sessionId: session.id,
  //         type: 'image/jpeg',
  //       },
  //       responseType: 'blob',
  //     })

  //     return URL.createObjectURL(new Blob([result]))
  //   },
  // },
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
  base: 'data.payment.health',
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
            }))
        )(session)
      ),
  },
  enable: fp.allPass([
    insured.validate,
    beneficiary.validate,
    healthCancer.validate,
    healthProduct.validate,
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
