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
            'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Fpdf.png?alt=media&token=18e89bf2-f44f-4703-8990-903d89241092',
          size: '3xl',
        },
        {
          type: 'button',
          action: {
            type: 'uri',
            label: ok,
            uri: url,
          },
          margin: 'lg',
          style: 'primary',
        },
      ],
    },
  },
})
