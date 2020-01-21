export default ({
  title, info, yes, no,
}) => ({
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
          action: {
            type: 'message',
            label: no.label || no,
            text: no.text || no,
          },
        },
        {
          type: 'button',
          style: 'primary',
          action: {
            type: 'message',
            label: yes.label || yes,
            text: yes.text || yes,
          },
        },
      ],
    },
    styles: { body: { separator: true } },
  },
})
