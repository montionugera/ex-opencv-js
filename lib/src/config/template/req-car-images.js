export default ({ title, ok, url }) => ({
  type: 'flex',
  altText: title,
  contents: {
    type: 'bubble',
    direction: 'ltr',
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'lg',
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
            'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Fcar-images.png?alt=media&token=52cc95c2-db53-4353-96fd-c2220c01835f',
          size: '3xl',
          aspectRatio: '1:2',
          backgroundColor: '#FFFFFF',
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
