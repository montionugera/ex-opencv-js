/* eslint-disable func-names */
/* eslint-disable object-shorthand */
import * as fp from 'lodash/fp'
import ApiService from 'moleculer-web'
import express from 'express'
import cors from 'cors'

import { uploadMiddleware } from 'services/upload'

const isDebug =
  process.env.MODE === 'debug' || process.env.NODE_ENV !== 'production'

const onError = (req, res, err) => {
  if (fp.isFinite(err.code)) {
    res.writeHead(err.code)
    res.end(
      JSON.stringify({
        message: err.message,
        code: err.code,
        data: err.data,
      })
    )
  } else {
    res.writeHead(500)
    res.end(err.message)
  }
}

export default {
  mixins: [ApiService],
  created() {
    const app = express()

    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      })
    )
    app.use(this.express())

    this.app = app

    if (!isDebug) {
      const { logger } = this
      this.logger = {
        error: logger.error.bind(this),
        debug: () => null,
        info: () => null,
        warn: () => null,
      }
    }
  },
  async started() {
    await new Promise((resolve, reject) =>
      this.app.listen(this.settings.port, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    )
  },
  async stopped() {
    if (this.app.listening) {
      await new Promise((resolve, reject) =>
        this.app.close((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      )
    }
  },
  settings: {
    port: 5000,
    middleware: true,
    log4XXResponses: true,
    routes: [
      {
        path: '/',
        onError,
        callOptions: {
          meta: {
            tracing: true,
          },
        },
        use: uploadMiddleware,
      },
    ],
  },
}
