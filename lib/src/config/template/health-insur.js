import * as fp from 'lodash/fp'

export default ({
  title, product, totalPrice, url,
}) => {
  const plan = product.plans.value[0]

  return {
    type: 'flex',
    altText: title,
    contents: {
      type: 'bubble',
      direction: 'ltr',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'xxl',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'image',
                url: product.image.value,
                align: 'start',
                size: 'md',
                aspectMode: 'cover',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: product.type.value,
                    size: 'xl',
                    weight: 'bold',
                    color: '#6C6C6C',
                  },
                  {
                    type: 'text',
                    text: plan.title.value,
                    size: 'lg',
                    color: '#7B7B7B',
                  },
                  {
                    type: 'filler',
                  },
                  {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                      {
                        type: 'text',
                        text: totalPrice.value,
                        flex: 0,
                        size: 'lg',
                        weight: 'bold',
                        color: '#FC749C',
                        wrap: true,
                      },
                      {
                        type: 'text',
                        text: 'common:currencies.baht',
                        margin: 'sm',
                        size: 'sm',
                        gravity: 'center',
                        weight: 'regular',
                        color: '#FC749C',
                        wrap: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            margin: 'lg',
            contents: fp.map((c) => ({
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  text: c.label,
                  margin: 'sm',
                  align: 'start',
                  weight: 'bold',
                  wrap: true,
                },
                {
                  type: 'text',
                  text: [c.value, 'common:currencies.baht'],
                  size: 'sm',
                  align: 'end',
                  weight: 'regular',
                },
              ],
            }))(plan.converage.value),
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'common:view_info',
              uri: (function uri() {
                const newUrl = new URL(url)

                newUrl.searchParams.append('productId', product.id.value)
                newUrl.searchParams.append('planId', plan.id.value)

                return newUrl.href
              }()),
            },
            color: '#FC749C',
            style: 'primary',
          },
        ],
      },
    },
  }
}
