import * as fp from 'lodash/fp'

import { Decimal } from 'decimal.js'

import { createSelector } from 'utils/selector'
import { numberFormatting } from 'utils/format'
import { carProduct, addition } from 'config/model/car'

export const getDiscount = (product) => {
  const hasCCTV = fp.getOr(false, addition.fields.has_cctv.path, product)

  let discount = new Decimal(0)
  if (hasCCTV) {
    discount = discount.add(0.05)
  }

  return discount.toNumber()
}

export const getCarActPrice = (product) => {
  const isBuyCarAct = fp.getOr(false, addition.fields.is_buy_car_act.path, product)

  if (isBuyCarAct) {
    return 599
  }

  return 0
}

export const getDiscountPrice = (product) => {
  const price = fp.get(carProduct.fields.price.path, product)
  const topup = fp.getOr(0, carProduct.fields.topup.path, product)
  const discount = getDiscount(product)

  if (fp.isNil(price)) return undefined

  return new Decimal(price).mul(new Decimal(1).minus(topup).minus(discount)).toNumber()
}

export const getTotalPrice = (product) => {
  const discountPrice = getDiscountPrice(product)

  if (fp.isNil(discountPrice)) return undefined

  let total = new Decimal(discountPrice)

  total = total.add(getCarActPrice(product))

  return total.toNumber()
}

export const getCommission = (product) => {
  const price = fp.get(carProduct.fields.price.path, product)
  const commissionPercent = fp.get(carProduct.fields.commission_percent.path, product)

  if (!fp.isFinite(commissionPercent)) return undefined

  return new Decimal(price).mul(commissionPercent).toNumber()
}

export const getName = (product) => `${fp.get('brand.label', product)} ${fp.get('type.label', product)}`

export const getCarProductInfo = createSelector({
  id: {
    label: 'car:product.id',
    value: fp.get('id'),
  },
  name: {
    value: getName,
  },
  image: {
    value: fp.get('image'),
  },
  type: {
    label: 'car:product.type',
    value: fp.get('type.label'),
  },
  price: {
    label: 'car:product.price',
    value: fp.pipe(
      fp.get('price'),
      numberFormatting
    ),
    data: fp.get('price'),
  },
  discountPrice: {
    label: 'car:product.discountPrice',
    value: fp.pipe(
      getDiscountPrice,
      numberFormatting
    ),
    data: getDiscountPrice,
  },
  totalPrice: {
    label: 'car:product.totalPrice',
    value: fp.pipe(
      getTotalPrice,
      numberFormatting
    ),
    data: getTotalPrice,
  },
  carActPrice: {
    label: 'car:product.act',
    value: fp.pipe(
      getCarActPrice,
      fp.when(fp.isEqual(0), fp.constant(null)),
      numberFormatting
    ),
    data: getCarActPrice,
  },
  topup: {
    label: 'car:product.topup',
    value: fp.get('topup'),
  },
  commission: {
    label: 'car:product.commission',
    value: fp.pipe(
      getCommission,
      numberFormatting
    ),
    data: getCommission,
  },
  brand: {
    label: 'car:product.brand',
    value: fp.get('brand.label'),
  },
  brand_image: {
    label: 'car:product.brand_image',
    value: fp.get('brand_image'),
  },
  insurance_fund: {
    label: 'car:product.insurance_fund',
    value: fp.pipe(
      fp.get('car_coverage.insurance_fund'),
      numberFormatting
    ),
  },
  deductible_fee: {
    label: 'car:product.deductible_fee',
    value: fp.pipe(
      fp.get('car_coverage.deductible_fee'),
      numberFormatting
    ),
  },
  repair_type: {
    label: 'car:product.repair_type',
    value: fp.get('car_coverage.repair_type.label'),
  },
  theft_fund: {
    label: 'car:product.theft_fund',
    value: fp.pipe(
      fp.get('car_coverage.theft_fund'),
      numberFormatting
    ),
  },
  fire_fund: {
    label: 'car:product.fire_fund',
    value: fp.pipe(
      fp.get('car_coverage.fire_fund'),
      numberFormatting
    ),
  },
  flood_fund: {
    label: 'car:product.flood_fund',
    value: fp.pipe(
      fp.get('car_coverage.flood_fund'),
      numberFormatting
    ),
  },
  bodily_injury_per_person: {
    label: 'car:product.bodily_injury_per_person',
    value: fp.pipe(
      fp.get('uninsured_motorist_coverage.bodily_injury_per_person'),
      numberFormatting
    ),
  },
  bodily_injury_per_incident: {
    label: 'car:product.bodily_injury_per_incident',
    value: fp.pipe(
      fp.get('uninsured_motorist_coverage.bodily_injury_per_incident'),
      numberFormatting
    ),
  },
  property_damage_per_incident: {
    label: 'car:product.property_damage_per_incident',
    value: fp.pipe(
      fp.get('uninsured_motorist_coverage.property_damage_per_incident'),
      numberFormatting
    ),
  },
  coverage_passenger: {
    label: 'car:product.coverage_passenger',
    value: fp.get('insured_motorist_coverage.coverage_passenger'),
  },
  bodily_injury: {
    label: 'car:product.bodily_injury',
    value: fp.pipe(
      fp.get('insured_motorist_coverage.bodily_injury'),
      numberFormatting
    ),
  },
  medical_fund: {
    label: 'car:product.medical_fund',
    value: fp.pipe(
      fp.get('insured_motorist_coverage.medical_fund'),
      numberFormatting
    ),
  },
  bail_bond_fund: {
    label: 'car:product.bail_bond_fund',
    value: fp.pipe(
      fp.get('insured_motorist_coverage.bail_bond_fund'),
      numberFormatting
    ),
  },
})
