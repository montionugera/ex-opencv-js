import * as fp from 'lodash/fp'
import { dateTimeFormatting } from 'utils/format'

export default ({
  title, productInfo, totalPrice, paymentType, timestamp, referenceNumber,
}) => {
  const plan = productInfo.plans.value[0]

  return {
    type: 'flex',
    altText: title,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'image',
            url: productInfo.image.value,
            size: 'xl',
            aspectRatio: '1:1',
            aspectMode: 'fit',
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: productInfo.type.value,
                align: 'center',
                weight: 'bold',
              },
              {
                type: 'text',
                text: plan.title.value,
                align: 'center',
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'text',
            text: 'payment:receipt.payment_success',
            margin: 'lg',
            size: 'sm',
            gravity: 'center',
            weight: 'bold',
            color: '#FC749C',
            wrap: true,
          },
          {
            type: 'text',
            text: [totalPrice.value, 'common:currencies.baht'],
            margin: 'none',
            size: 'xl',
            gravity: 'center',
            weight: 'bold',
            wrap: true,
          },
          {
            type: 'text',
            text: `payment:type.${fp.toLower(paymentType)}`,
            margin: 'none',
            size: 'sm',
            gravity: 'center',
            weight: 'bold',
            color: '#000000',
            wrap: true,
          },
          {
            type: 'text',
            text: dateTimeFormatting(timestamp),
            margin: 'none',
            size: 'sm',
            gravity: 'center',
            weight: 'bold',
            color: '#AAAAAA',
            wrap: true,
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            margin: 'lg',
            contents: [
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: 'health:product.net',
                    flex: 0,
                    size: 'sm',
                    weight: 'regular',
                    color: '#AAAAAA',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [totalPrice.value, 'common:currencies.baht'],
                    flex: 4,
                    size: 'sm',
                    align: 'end',
                    color: '#000000',
                    wrap: true,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: 'health:product.vat',
                    flex: 0,
                    size: 'sm',
                    weight: 'regular',
                    color: '#AAAAAA',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: ['-', 'common:currencies.baht'],
                    flex: 4,
                    size: 'sm',
                    align: 'end',
                    color: '#000000',
                    wrap: true,
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                margin: 'xl',
                contents: [
                  {
                    type: 'text',
                    text: 'payment:reference_number',
                    margin: 'xl',
                    size: 'md',
                    align: 'start',
                    weight: 'bold',
                    color: '#000000',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: referenceNumber,
                    margin: 'none',
                    size: 'xs',
                    align: 'start',
                    color: '#696464',
                    wrap: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  }
}
