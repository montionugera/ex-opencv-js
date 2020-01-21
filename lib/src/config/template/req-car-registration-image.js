export default ({ title, ok, url }) => ({
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
          wrap: true,
        },
        {
          type: 'image',
          url:
            'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Fcar-registration-upper.jpg?alt=media&token=9348566b-9f3e-41a9-bfd8-cc9cdc682693',
          margin: 'sm',
          size: '3xl',
          backgroundColor: '#FFFFFF',
        },
        {
          type: 'button',
          action: {
            type: 'uri',
            label: ok,
            uri: url,
          },
          margin: 'sm',
          style: 'primary',
        },
      ],
    },
  },
})
