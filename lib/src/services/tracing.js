/* eslint-disable func-names */
import * as fp from 'lodash/fp'
import { initTracerFromEnv } from 'jaeger-client'
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'

let tracer

const trace = (span, ctx, { data, error, endTime } = {}) => {
  span.setTag('nodeID', ctx.broker.nodeID)

  if (error) {
    span.setTag(Tags.ERROR, true)
    span.log({
      error: error.stack,
    })
  }

  if (fp.isPlainObject(data)) {
    span.log({
      data,
    })
  }

  span.finish(endTime)
}

export const createTracing = (ctx, tracing = ctx.meta.tracing) => {
  const cache = {}
  const parent = tracer.extract(FORMAT_HTTP_HEADERS, ctx.meta)
  return {
    start: (name, options = {}) => {
      if (tracing) {
        const span = tracer.startSpan(name, {
          childOf: parent,
          ...options,
        })

        tracer.inject(span, FORMAT_HTTP_HEADERS, ctx.meta)

        cache[name] = span
      }
    },
    end: (name, params) => {
      if (tracing) {
        const span = cache[name]
        if (span) {
          trace(span, ctx, params, tracing)

          delete cache[name]
        }
      }
    },
  }
}

export default {
  created(broker) {
    tracer = initTracerFromEnv({
      serviceName: broker.nodeID.replace(/-\d+/, ''),
      sampler: {
        type: 'const',
        param: 1,
      },
    })

    broker.createTracing = createTracing
  },
  localAction(next, action) {
    return async function(ctx) {
      const tracing = createTracing(ctx)

      try {
        tracing.start(action.name)

        const result = await next(ctx)

        tracing.end(action.name, {
          data: result,
        })

        return result
      } catch (error) {
        tracing.end(action.name, {
          error,
        })

        throw error
      }
    }
  },
}
