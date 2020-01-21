import * as fp from 'lodash/fp'
import fs from 'fs'
import path from 'path'
import glob from 'glob'

import process from 'process'

const filterList = []

describe('process', () => {
  const files = glob.sync(path.join(__dirname, '../../__fixtures__/car-registration-upper/*.json'))

  const testCases = fp.pipe(
    fp.filter((path) => {
      if (fp.isEmpty(filterList)) return true

      const name = fp.pipe(
        fp.split('/'),
        fp.last
        //
      )(path)

      return fp.contains(name, filterList)
    }),
    fp.map((path) => {
      const name = fp.pipe(
        fp.split('/'),
        fp.last
        //
      )(path)
      const data = JSON.parse(fs.readFileSync(path))

      return {
        name,
        data,
      }
    })
  )(files)

  testCases
    .forEach(({ name, data }) => {
      describe(name, () => {
        it('return correctly', () => {
          const result = process(data)
          expect(result).toMatchSnapshot()
        })
      })
    })
})
