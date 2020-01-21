export default ({ title, ok, url }) => ({
  type: 'flex',
  altText: title,
  contents: {
    type: 'bubble',
    direction: 'ltr',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: title,
          align: 'center',
          weight: 'bold',
        },
      ],
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: ok,
            uri: url,
          },
          style: 'primary',
        },
      ],
    },
  },
})
