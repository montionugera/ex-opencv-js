export default ({ content, thumbnail }) => ({
  type: 'image',
  originalContentUrl: content,
  previewImageUrl: thumbnail,
})
