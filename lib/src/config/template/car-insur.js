import * as fp from 'lodash/fp'

export default ({ title, productInfos = [], url }) => ({
  type: 'flex',
  altText: title,
  contents: {
    type: 'carousel',
    contents: fp.map((p) => ({
      type: 'bubble',
      direction: 'ltr',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'image',
                    url: p.brand_image.value,
                    align: 'center',
                    size: 'md',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: p.brand.value,
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: p.type.value,
                    weight: 'regular',
                  },
                  {
                    type: 'filler',
                  },
                  ...(() => {
                    const boxs = [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: p.discountPrice.value,
                            flex: 0,
                            size: 'lg',
                            weight: 'bold',
                            color: '#4A4A4A',
                            wrap: true,
                          },
                          {
                            type: 'text',
                            text: ['common:currencies.baht', '/', 'common:unit.year'],
                            margin: 'sm',
                            size: 'sm',
                            gravity: 'center',
                            weight: 'regular',
                            wrap: true,
                          },
                        ],
                      },
                    ]

                    if (p.price.data !== p.discountPrice.data) {
                      boxs.unshift({
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: p.price.value,
                            decoration: 'line-through',
                            flex: 0,
                            size: 'lg',
                            weight: 'bold',
                            color: '#CCCCCC',
                            wrap: true,
                          },
                          {
                            type: 'text',
                            text: ['common:currencies.baht', '/', 'common:unit.year'],
                            margin: 'sm',
                            size: 'sm',
                            gravity: 'center',
                            weight: 'regular',
                            color: '#CCCCCC',
                            wrap: true,
                          },
                        ],
                      })
                    }

                    return boxs
                  })(),
                ],
              },
            ],
          },
          {
            type: 'separator',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            margin: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: p.insurance_fund.label,
                    flex: 0,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [p.insurance_fund.value, 'common:currencies.baht'],
                    size: 'sm',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: p.deductible_fee.label,
                    flex: 0,
                    margin: 'xl',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [p.deductible_fee.value, 'common:currencies.baht'],
                    size: 'sm',
                    align: 'end',
                    weight: 'regular',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: p.repair_type.label,
                    flex: 0,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: p.repair_type.value,
                    margin: 'sm',
                    size: 'sm',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: p.flood_fund.label,
                    flex: 0,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [p.flood_fund.value, 'common:currencies.baht'],
                    size: 'sm',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: p.property_damage_per_incident.label,
                    margin: 'sm',
                    weight: 'regular',
                    color: '#4A4A4A',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: [p.property_damage_per_incident.value, 'common:currencies.baht'],
                    margin: 'sm',
                    size: 'sm',
                    align: 'end',
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
              label: 'common:view_info',
              uri: (function uri() {
                const newUrl = new URL(url)

                newUrl.searchParams.append('productId', p.id.value)

                return newUrl.href
              }()),
            },
            style: 'primary',
          },
        ],
      },
    }))(productInfos),
  },
})
