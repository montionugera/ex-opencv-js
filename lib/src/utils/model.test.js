import * as fp from 'lodash/fp'

import { createModel } from './model'

describe('createModel', () => {
  const model = createModel({
    base: 'data.car',
    fields: {
      brand: {
        path: 'brand',
        required: true,
      },
    },
  })
  it('has field', () => {
    expect(model.fields.brand.field).toEqual('data.car.brand')
  })
  describe('when valid', () => {
    describe('when validate model', () => {
      it('return true', () => {
        const session = fp.set('data.car.brand', 'foo', {})
        expect(model.validate({ session })).toEqual(true)
      })
    })
    describe('when get model error message', () => {
      it('return object', () => {
        const session = fp.set('data.car.brand', 'foo', {})
        expect(model.getErrorMessages({ session })).toEqual({
          'data.car.brand': [],
        })
      })
    })
    describe('when validate field', () => {
      it('return true', () => {
        const session = fp.set('data.car.brand', 'foo', {})
        expect(model.fields.brand.validate({ session })).toEqual(true)
      })
    })
    describe('when get error message', () => {
      it('return empty list', () => {
        const session = fp.set('data.car.brand', 'foo', {})
        expect(model.fields.brand.getErrorMessages({ session })).toEqual([])
      })
    })
  })
  describe('when invalid', () => {
    describe('when validate model', () => {
      it('return false', () => {
        const session = fp.set('data.car.brand', null, {})
        expect(model.validate({ session })).toEqual(false)
      })
    })
    describe('when get model error message', () => {
      it('return object', () => {
        const session = fp.set('data.car.brand', null, {})
        expect(model.getErrorMessages({ session })).toEqual({
          'data.car.brand': ['validation:error.empty'],
        })
      })
    })
    describe('when validate field', () => {
      it('return false', () => {
        const session = fp.set('data.car.brand', null, {})
        expect(model.fields.brand.validate({ session })).toEqual(false)
      })
    })
    describe('when get error message', () => {
      it('return message list', () => {
        const session = fp.set('data.car.brand', null, {})
        expect(model.fields.brand.getErrorMessages({ session })).toEqual(['validation:error.empty'])
      })
    })
  })
})
