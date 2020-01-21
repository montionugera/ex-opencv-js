import * as fp from 'lodash/fp'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { ServiceBroker } from 'moleculer'

const filterList = ['1.jpg']

describe('ocr', () => {
  const broker = new ServiceBroker({
    logLevel: 'fetal',
    middlewares: [require('lib/services/__mocks__/tracing')],
  })

  broker.loadService(path.join(__dirname, '../../handler/process.js'))

  const files = glob.sync(
    path.join(__dirname, '../../__fixtures__/national-id/*.jpg')
  )

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
      const process = () =>
        broker.call('ocr.process', {
          type: 'national_id',
          files: [
            {
              buffer: fs.readFileSync(path),
            },
          ],
        })

      return {
        name,
        process,
      }
    })
  )(files)

  beforeAll(async () => {
    await broker.start()
  })

  afterAll(async () => {
    await broker.stop()
  })

  testCases.forEach(({ name, process }) => {
    describe(name, () => {
      it('return correctly', async () => {
        const result = await process()
        expect(result).toMatchSnapshot()
      }, 30000)
    })
  })
})
