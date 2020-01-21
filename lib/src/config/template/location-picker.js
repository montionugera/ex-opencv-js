export default ({ title, label }) => ({
  type: 'text',
  text: title,
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'location',
          label,
        },
      },
    ],
  },
})

// Flex version
// export default ({ title, label }) => ({
//   type: 'flex',
//   altText: title,
//   contents: {
//     type: 'bubble',
//     direction: 'ltr',
//     header: {
//       type: 'box',
//       layout: 'vertical',
//       contents: [
//         {
//           type: 'text',
//           text: 'ที่อยู่สำหรับจัดส่งเอกสาร',
//           align: 'center',
//           weight: 'bold',
//         },
//       ],
//     },
//     hero: {
//       type: 'image',
//       url:
//         'https://firebasestorage.googleapis.com/v0/b/agentmate-line-bot.appspot.com/o/assets%2Fimages%2Faddress.png?alt=media&token=9541a9c2-fcbe-402b-a8be-92012c48e74c',
//       size: 'full',
//       aspectRatio: '1.51:1',
//       aspectMode: 'fit',
//     },
//     footer: {
//       type: 'box',
//       layout: 'horizontal',
//       contents: [
//         {
//           type: 'button',
//           action: {
//             type: 'uri',
//             label,
//             uri: 'line://nv/location',
//           },
//           style: 'primary',
//         },
//       ],
//     },
//   },
// })
