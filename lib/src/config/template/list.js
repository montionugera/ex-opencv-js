export default ({ title, options = [] }) => ({
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
          type: 'text',
          text: title,
          align: 'center',
          weight: 'bold',
        },
        {
          type: 'separator',
          margin: 'md',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xl',
          contents: options.map(({ label }) => ({
            type: 'text',
            text: label,
            margin: 'xxl',
            size: 'md',
            align: 'center',
            color: '#42659A',
            action: {
              type: 'message',
              text: label,
            },
            wrap: true,
          })),
        },
      ],
    },
  },
})
