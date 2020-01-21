import * as fp from 'lodash/fp'

export default ({ title, product, url }) => ({
  type: 'flex',
  altText: title,
  contents: {
    type: 'carousel',
    contents: [
      {
        type: 'bubble',
        hero: {
          type: 'image',
          url: product.image.value,
          size: 'full',
          aspectRatio: '16:9',
          aspectMode: 'cover',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: product.type.value,
              size: 'xl',
              align: 'center',
              weight: 'bold',
              color: '#FC749C',
              wrap: true,
            },
            {
              type: 'text',
              text: product.title.value,
              margin: 'lg',
              size: 'md',
              weight: 'bold',
              wrap: true,
            },
            {
              type: 'text',
              text: product.details.value,
              margin: 'md',
              size: 'sm',
              weight: 'bold',
              wrap: true,
            },
          ],
        },
      },
    ].concat(
      fp.map((plan) => ({
        type: 'bubble',
        direction: 'ltr',
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'xxl',
          contents: [
            {
              type: 'text',
              text: plan.title.value,
              size: 'xl',
              align: 'center',
              weight: 'bold',
              color: '#FC749C',
            },
            {
              type: 'separator',
            },
            {
              type: 'box',
              layout: 'vertical',
              spacing: 'md',
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
      }))(product.plans.value)
    ),
  },
})
