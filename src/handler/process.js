import { Errors } from 'moleculer'
import { generateFields } from 'services/vision'
import i18n, { initI18n } from 'lib/i18n'

import process from 'process'
import preprocess from 'preprocess'
import postprocess from 'postprocess'
import formatter from 'formatter'

export default {
  name: 'ocr',
  async started() {
    await initI18n()
  },
  actions: {
    process: {
      bulkhead: {
        enabled: true,
        concurrency: 5,
        maxQueueSize: Infinity,
      },
      async handler(ctx) {
        try {
          const { files, type } = ctx.params
          const { buffer } = files[0]

          const tracing = this.broker.createTracing(ctx)

          // tracing.start('preprocess')
          // const base64 = await preprocess(Buffer.from(buffer))
          // tracing.end('preprocess')

          const base64 = Buffer.from(buffer).toString('base64')

          tracing.start('vision')
          const scene = await generateFields(base64)
          tracing.end('vision')

          tracing.start('process')
          const result = await process(scene, type)
          tracing.end('process')

          tracing.start('postprocess')
          const postResult = await postprocess(
            Buffer.from(buffer),
            result,
            type
          )
          tracing.end('postprocess')

          const formatedResult = formatter(postResult)

          return {result : formatedResult, version : 1.0}
        } catch (err) {
          console.error(err)
          throw new Errors.MoleculerError(
            i18n().t('attachment:ocr.error.AIS.0101')
          )
        }
      },
    },
  },
}
