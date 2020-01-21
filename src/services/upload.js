/* eslint-disable func-names */
import * as fp from 'lodash/fp'
import multer from 'multer'

const upload = multer()

export const uploadMiddleware = [
  upload.any(),
  async function(req, res, next) {
    const isUploadFile = fp.pipe(
      fp.get('headers.content-type'),
      fp.startsWith('multipart/form-data')
    )(req)

    if (isUploadFile) {
      try {
        let endpoint = req.parsedUrl.slice(1).replace(/\//g, '.')

        if (req.$route.aliases) {
          const result = this.resolveAlias(req.$route, req.url.slice(1), req.method)
          if (result && result.alias) {
            req.$params = fp.assign(req.$params, result.params)

            const { handler, action } = result.alias
            if (fp.isFunction(handler)) {
              await handler.call(this, req, res)
              endpoint = req.$endpoint
            } else if (fp.isString(action)) {
              endpoint = action
            }
          }
        }

        const files = fp.map(
          ({ buffer, fieldname, encoding, mimetype, originalname }) => ({
            encoding,
            mimetype,
            buffer,
            key: fieldname,
            filename: originalname,
          })
        )(req.files)
        const params = fp.assignAll([{ files }, req.body, req.query])

        req.$endpoint = endpoint

        await this.callAction(
          req.$route,
          req.$endpoint,
          req,
          res,
          params
        )
      } catch (err) {
        next(err)
      }
    } else {
      next()
    }
  },
]
