export default ({ title, productInfo, url }) => ({
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
                  url: productInfo.brand_image.value,
                  align: 'center',
                  size: 'lg',
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
                  text: productInfo.brand.value,
                  align: 'center',
                  weight: 'bold',
                },
                {
                  type: 'text',
                  text: productInfo.type.value,
                  align: 'center',
                  weight: 'regular',
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
                  text: 'car:product.net',
                  flex: 0,
                  margin: 'sm',
                  weight: 'regular',
                  color: '#4A4A4A',
                  wrap: true,
                },
                {
                  type: 'text',
                  text: [productInfo.totalPrice.value, 'common:currencies.baht'],
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
                  text: 'car:product.stamps',
                  flex: 0,
                  margin: 'xl',
                  weight: 'regular',
                  color: '#4A4A4A',
                  wrap: true,
                },
                {
                  type: 'text',
                  text: ['-', 'common:currencies.baht'],
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
                  text: 'car:product.vat',
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
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'car:product.act',
                  flex: 0,
                  margin: 'sm',
                  weight: 'regular',
                  color: '#4A4A4A',
                  wrap: true,
                },
                {
                  type: 'text',
                  text: [productInfo.carActPrice.value.trim(), 'common:currencies.baht'],
                  margin: 'sm',
                  size: 'sm',
                  align: 'end',
                  weight: 'bold',
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
                  text: 'car:product.total',
                  flex: 0,
                  margin: 'sm',
                  size: 'lg',
                  weight: 'bold',
                  color: '#4A4A4A',
                  wrap: true,
                },
                {
                  type: 'text',
                  text: [productInfo.totalPrice.value, 'common:currencies.baht'],
                  size: 'lg',
                  align: 'end',
                  weight: 'bold',
                  color: '#15C84F',
                },
              ],
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
          style: 'primary',
        },
      ],
    },
  },
})
