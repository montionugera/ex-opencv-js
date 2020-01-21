import { actions } from 'xstate'

import {
  CHANGE_LANGUAGE,
  SHOW_GREETING,
  SHOW_ADMIN_TOOL,
  ASK_INSURED,
  ASK_BENEFICIARY,
  ASK_BASIC,
  ASK_CONSENT,
  ASK_NATIONAL_ID_IMAGES,
  DONE_NATIONAL_ID_IMAGES,
} from 'constants/command'
import i18n from 'i18n'

import liff from 'config/template/liff'
import text from 'config/template/text'
import reqNationalIdImage from 'config/template/req-national-id-image'

import carCommand from './car'
import healthCommand from './health'

export default {
  states: {
    ...carCommand,
    ...healthCommand,
    [CHANGE_LANGUAGE]: {
      entry: actions.assign({
        language: (context, action) => action.args[0],
      }),
    },
    [SHOW_GREETING]: {
      meta: {
        message: ({ session, action }) => {
          const url = new URL(process.env.LIFF_ADMIN_URL)

          url.searchParams.set('sessionId', session.id || action.args[0])

          const translateTH = i18n().getFixedT('th')
          const translateEN = i18n().getFixedT('en')

          return [
            text([
              translateTH('common:welcome_message'),
              '/',
              translateEN('common:welcome_message'),
            ]),
            liff({
              title: [translateTH('common:admin_tool'), '/', translateEN('common:admin_tool')],
              ok: [translateTH('common:open'), '/', translateEN('common:open')],
              url: url.href,
            }),
          ]
        },
      },
    },
    [SHOW_ADMIN_TOOL]: {
      meta: {
        message: ({ session, action }) => {
          const url = new URL(process.env.LIFF_ADMIN_URL)

          url.searchParams.set('sessionId', session.id || action.args[0])

          return liff({
            title: 'common:admin_tool',
            ok: 'common:open',
            url: url.href,
          })
        },
      },
    },
    [ASK_CONSENT]: {
      meta: {
        message: text(ASK_CONSENT),
      },
    },
    [ASK_INSURED]: {
      meta: {
        message: text(ASK_INSURED),
      },
    },
    [ASK_BASIC]: {
      meta: {
        message: text(ASK_BASIC),
      },
    },
    [ASK_BENEFICIARY]: {
      meta: {
        message: text(ASK_BENEFICIARY),
      },
    },
    [ASK_NATIONAL_ID_IMAGES]: {
      meta: {
        message: ({ session }) => {
          const url = new URL(process.env.LIFF_CLIENT_URL)

          url.searchParams.set('sessionId', session.id)
          url.searchParams.set('type', session.data.insurance_type)
          url.searchParams.set('language', session.language)
          url.searchParams.set('path', 'req-national-id')

          return reqNationalIdImage({
            title: 'attachment:req_national_id_image.info',
            ok: 'common:capture_image',
            url: url.href,
          })
        },
      },
    },
    [DONE_NATIONAL_ID_IMAGES]: {
      meta: {
        message: text('attachment:req_national_id_image.done'),
      },
    },
  },
}
