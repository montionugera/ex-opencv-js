import * as fp from 'lodash/fp'

import moment from 'moment'
import { Decimal } from 'decimal.js'

import { createSelector } from 'utils/selector'
import { numberFormatting, dateFormatting } from 'utils/format'
import { healthCancer, insured, beneficiary } from 'config/model/health'

export const getCoverage = createSelector({
  melanoma: {
    label: 'health:product.melanoma',
    value: fp.pipe(
      fp.get('melanoma'),
      numberFormatting
    ),
  },
  non_melanoma: {
    label: 'health:product.non_melanoma',
    value: fp.pipe(
      fp.get('non_melanoma'),
      numberFormatting
    ),
  },
  treatment_fund: {
    label: 'health:product.treatment_fund',
    value: fp.pipe(
      fp.get('treatment_fund'),
      numberFormatting
    ),
  },
  death_fund: {
    label: 'health:product.death_fund',
    value: fp.pipe(
      fp.get('death_fund'),
      numberFormatting
    ),
  },
})

export const getHealthProductPlan = createSelector({
  id: {
    label: 'health:product.id',
    value: fp.get('id'),
  },
  base_id: {
    label: 'health:product.base_id',
    value: fp.get('base_id'),
  },
  image: {
    label: 'health:product.image',
    value: fp.get('image'),
  },
  title: {
    label: 'health:product.title',
    value: fp.get('title.label'),
  },
  converage: {
    label: 'health:product.converage',
    value: fp.pipe(
      fp.get('converage'),
      getCoverage
    ),
  },
  rate: {
    value: fp.get('premium'),
  },
})

export const getHealthProductInfo = createSelector({
  id: {
    label: 'health:product.id',
    value: fp.get('id'),
  },
  type: {
    label: 'health:product.type',
    value: fp.get('type.label'),
  },
  image: {
    label: 'health:product.image',
    value: fp.get('image'),
  },
  title: {
    label: 'health:product.title',
    value: fp.get('title.label'),
  },
  details: {
    label: 'health:product.details',
    value: fp.get('details.label'),
  },
  plans: {
    label: 'health:product.plans',
    value: fp.pipe(
      fp.get('plans'),
      fp.values,
      fp.map(getHealthProductPlan)
    ),
  },
})

export const getPremium = (product, { session }) => {
  const productInfo = getHealthProductInfo(product)

  const age = fp.pipe(
    fp.get(insured.fields.dob.field),
    (date) => moment().diff(moment(date, 'YYYY-MM-DD'), 'years', true),
    fp.floor
  )(session)

  const rate = fp.get('plans.value[0].rate.value', productInfo)

  const { price } = fp.find(({ min_age, max_age }) => age >= min_age && age <= max_age, rate) || {}

  const premium = fp.toFinite(price)

  return {
    label: 'health:product.premium',
    value: numberFormatting(premium),
    data: premium,
  }
}

export const getInsuredInfo = createSelector({
  name: {
    label: insured.fields.name.label,
    value: fp.get(insured.fields.name.field),
  },
  gender: {
    label: insured.fields.gender.label,
    value: fp.get(insured.fields.gender.field),
  },
  dob: {
    label: insured.fields.dob.label,
    value: fp.pipe(
      fp.get(insured.fields.dob.field),
      dateFormatting
    ),
  },
  age: {
    label: '',
    value: fp.pipe(
      fp.get(insured.fields.dob.field),
      (date) => moment().diff(moment(date, 'YYYY-MM-DD'), 'years', true),
      fp.floor
    ),
  },
  national_id: {
    label: insured.fields.national_id.label,
    value: fp.get(insured.fields.national_id.field),
  },
  job: {
    label: insured.fields.job.label,
    value: fp.get(insured.fields.job.field),
  },
  height: {
    label: insured.fields.height.label,
    value: fp.get(insured.fields.height.field),
  },
  weight: {
    label: insured.fields.weight.label,
    value: fp.get(insured.fields.weight.field),
  },
  current_location: {
    label: insured.fields.current_location.label,
    value: fp.get(insured.fields.current_location.field),
  },
  work_location: {
    label: insured.fields.work_location.label,
    value: fp.get(insured.fields.work_location.field),
  },
  income_per_month: {
    label: insured.fields.income_per_month.label,
    value: fp.get(insured.fields.income_per_month.field),
  },
})

export const getBeneficiaryInfo = createSelector({
  name: {
    label: beneficiary.fields.name.label,
    value: fp.get(beneficiary.fields.name.field),
  },
  relationship: {
    label: beneficiary.fields.relationship.label,
    value: fp.get(beneficiary.fields.relationship.field),
  },
  location: {
    label: beneficiary.fields.location.label,
    value: fp.get(beneficiary.fields.location.field),
  },
})

export const getHealthCancerInfo = createSelector({
  has_excepted_cancer: {
    label: healthCancer.fields.has_excepted_cancer.label,
    value: fp.get(healthCancer.fields.has_excepted_cancer.field),
  },
  excepted_cancer: {
    label: healthCancer.fields.excepted_cancer.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_excepted_cancer.field),
      fp.get(healthCancer.fields.excepted_cancer.field),
      fp.constant('')
    ),
  },
  has_cancer: {
    label: healthCancer.fields.has_cancer.label,
    value: fp.get(healthCancer.fields.has_cancer.field),
  },
  cancer: {
    label: healthCancer.fields.cancer.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_cancer.field),
      fp.get(healthCancer.fields.cancer.field),
      fp.constant('')
    ),
  },
  is_smoking: {
    label: healthCancer.fields.is_smoking.label,
    value: fp.get(healthCancer.fields.is_smoking.field),
  },
  smoking_amount: {
    label: healthCancer.fields.smoking_amount.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.is_smoking.field),
      fp.get(healthCancer.fields.smoking_amount.field),
      fp.constant('')
    ),
  },
  smoking_start: {
    label: healthCancer.fields.smoking_start.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.is_smoking.field),
      fp.get(healthCancer.fields.smoking_start.field),
      fp.constant('')
    ),
  },
  smoking_end: {
    label: healthCancer.fields.smoking_end.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.is_smoking.field),
      fp.get(healthCancer.fields.smoking_end.field),
      fp.constant('')
    ),
  },
  smoking_total: {
    label: '',
    value: fp.ifElse(
      fp.get(healthCancer.fields.is_smoking.field),
      (data) => {
        const st = fp.get(healthCancer.fields.smoking_start.field, data)
        const ed = fp.get(healthCancer.fields.smoking_end.field, data)

        return Math.abs(parseInt(st, 10) - parseInt(ed, 10))
      },
      fp.constant('')
    ),
  },
  is_still_smoking: {
    label: healthCancer.fields.is_still_smoking.label,
    value: fp.get(healthCancer.fields.is_still_smoking.field),
  },
  currently_smoking_amount: {
    label: healthCancer.fields.currently_smoking_amount.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.is_still_smoking.field),
      fp.get(healthCancer.fields.currently_smoking_amount.field),
      fp.constant('')
    ),
  },
  has_disease_a: {
    label: healthCancer.fields.has_disease_a.label,
    value: fp.get(healthCancer.fields.has_disease_a.field),
  },
  disease_a_name: {
    label: healthCancer.fields.disease_a_name.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_disease_a.field),
      fp.get(healthCancer.fields.disease_a_name.field),
      fp.constant('')
    ),
  },
  has_disease_b: {
    label: healthCancer.fields.has_disease_b.label,
    value: fp.get(healthCancer.fields.has_disease_b.field),
  },
  disease_b_type: {
    label: healthCancer.fields.disease_b_type.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_disease_b.field),
      fp.get(healthCancer.fields.disease_b_type.field),
      fp.constant('')
    ),
  },
  disease_b_organ: {
    label: healthCancer.fields.disease_b_organ.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_disease_b.field),
      fp.get(healthCancer.fields.disease_b_organ.field),
      fp.constant('')
    ),
  },
  has_disease_c: {
    label: healthCancer.fields.has_disease_c.label,
    value: fp.get(healthCancer.fields.has_disease_c.field),
  },
  disease_c_type: {
    label: healthCancer.fields.disease_c_type.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_disease_c.field),
      fp.get(healthCancer.fields.disease_c_type.field),
      fp.constant('')
    ),
  },
  has_insurance_company: {
    label: healthCancer.fields.has_insurance_company.label,
    value: fp.get(healthCancer.fields.has_insurance_company.field),
  },
  insurance_company_name: {
    label: healthCancer.fields.insurance_company_name.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_insurance_company.field),
      fp.get(healthCancer.fields.insurance_company_name.field),
      fp.constant('')
    ),
  },
  insurance_company_amount: {
    label: healthCancer.fields.insurance_company_amount.label,
    value: fp.ifElse(
      fp.get(healthCancer.fields.has_insurance_company.field),
      fp.pipe(
        fp.get(healthCancer.fields.insurance_company_amount.field),
        numberFormatting
      ),
      fp.constant('')
    ),
  },
})
