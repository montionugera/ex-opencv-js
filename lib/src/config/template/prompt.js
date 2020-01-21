export default ({ title, info, ok }) => ({
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
          wrap: true,
        },
      ],
    },
    body: info
      ? {
        type: 'box',
        layout: 'vertical',
        contents: info.map((text) => ({
          type: 'text',
          wrap: true,
          text,
        })),
      }
      : undefined,
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          style: 'primary',
          action: {
            type: 'message',
            label: ok,
            text: ok,
          },
        },
      ],
    },
    styles: { footer: { separator: true } },
  },
})
