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
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: product.image.value,
                    align: 'center',
                    size: 'xl',
                    aspectRatio: '1:1',
                    aspectMode: 'cover',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: product.type.value,
                    size: 'lg',
                    align: 'center',
                    weight: 'bold',
                    color: '#6C6C6C',
                  },
                  {
                    type: 'text',
                    text: plan.title.value,
                    size: 'md',
                    align: 'center',
                    color: '#7B7B7B',
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
            margin: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'health:product.net',
                    flex: 0,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [totalPrice.value, 'common:currencies.baht'],
                    size: 'sm',
                    align: 'end',
                    weight: 'bold',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'health:product.vat',
                    flex: 0,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: ['-', 'common:currencies.baht'],
                    margin: 'sm',
                    size: 'sm',
                    align: 'end',
                    weight: 'bold',
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
            layout: 'horizontal',
            margin: 'lg',
            contents: [
              {
                type: 'text',
                text: 'health:product.total',
                flex: 0,
                size: 'lg',
                weight: 'bold',
                color: '#4A4A4A',
                wrap: true,
              },
              {
                type: 'text',
                text: [totalPrice.value, 'common:currencies.baht'],
                size: 'lg',
                align: 'end',
                weight: 'bold',
                color: '#FC749C',
              },
            ],
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
              label: 'common:pay',
              uri: url,
            },
            color: '#FC749C',
            style: 'primary',
          },
        ],
      },
    },
  }
}
