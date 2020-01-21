export default ({
  title, label, min, max,
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
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          action: {
            type: 'datetimepicker',
            label,
            data: 'date',
            mode: 'date',
            min,
            max,
          },
          style: 'primary',
        },
      ],
    },
  },
})
