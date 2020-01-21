import * as fp from 'lodash/fp'
import path from 'path'
import fs from 'fs'
import glob from 'glob'

import preprocess from './index'

const filterList = []

describe('preprocess', () => {
  const files = glob.sync(path.join(__dirname, '../__fixtures__/*.jpg'))

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
      const image = fs.readFileSync(path)

      return {
        name,
        image,
      }
    })
  )(files)

  testCases.forEach(({ name, image }) => {
    describe(name, () => {
      it('return correctly', async () => {
        const base64 = await preprocess(image)

        fs.writeFileSync(path.join(__dirname, '__fixtures__', name), base64, {
          encoding: 'base64',
        })
      }, 30000)
    })
  })
})
