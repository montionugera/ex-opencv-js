import * as fp from 'lodash/fp'
import { createSelector } from './selector'

describe('createSelector', () => {
  const selector = createSelector({
    foo: {
      label: 'foo:foo',
      value: fp.get('foo'),
    },
  })({ foo: 'bar' })

  it('has value', () => {
    expect(selector.foo.value).toEqual('bar')
  })
})
