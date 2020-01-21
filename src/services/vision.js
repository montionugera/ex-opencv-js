import Vision from '@google-cloud/vision'

const client = new Vision.ImageAnnotatorClient()

export const generateFields = async (
  base64,
  type = 'DOCUMENT_TEXT_DETECTION'
) => {
  const requests = [
    {
      image: {
        content: base64,
      },
      features: [
        {
          type,
        },
      ],
      imageContext: {
        languageHints: ['th', 'en'],
      },
    },
  ]

  const [
    {
      responses: [result],
    },
  ] = await client.batchAnnotateImages({ requests })

  return result
}
