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
            'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Fagreement.png?alt=media&token=201a8e3f-1918-4dcf-bd1d-f7e48188e817',
          size: '4xl',
        },
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
