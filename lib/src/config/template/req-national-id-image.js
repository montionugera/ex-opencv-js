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
            'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Fnational-id.png?alt=media&token=3c3dd84f-198f-4d18-8551-0234b56cad6d',
          size: '5xl',
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
