import { labeling } from './masterdata'

describe('Labeling', () => {
  it('when object', () => {
    const data = {
      name: { value: '1', label: { th: 'th', en: 'en' } },
      nest: {
        nest: {
          name: { value: '1', label: { th: 'th', en: 'en' } },
        },
      },
      number: 1234,
      label: 'hi',
    }
    const result = labeling('th')(data)

    expect(result).toEqual({
      name: { value: '1', label: 'th' },
      nest: {
        nest: {
          name: { value: '1', label: 'th' },
        },
      },
      number: 1234,
      label: 'hi',
    })
  })

  it('when arrary nested', () => {
    const data = [
      {
        name: { value: '1', label: { th: 'th', en: 'en' } },
        nest: {
          nest: {
            name: { value: '1', label: { th: 'th', en: 'en' } },
          },
        },
        number: 1234,
        label: 'hi',
      },
      {
        name: { value: '2', label: { th: 'th', en: 'en' } },
        nest: {
          nest: {
            name: { value: '1', label: { th: 'th', en: 'en' } },
          },
        },
        number: 5678,
        label: 'world',
      },
    ]

    const result = labeling('th')(data)

    expect(result).toEqual([
      {
        name: { value: '1', label: 'th' },
        nest: {
          nest: {
            name: { value: '1', label: 'th' },
          },
        },
        number: 1234,
        label: 'hi',
      },
      {
        name: { value: '2', label: 'th' },
        nest: {
          nest: {
            name: { value: '1', label: 'th' },
          },
        },
        number: 5678,
        label: 'world',
      },
    ])
  })

  it('when arrary', () => {
    const data = [
      {
        value: '1',
        label: {
          th: 'ประกันชั้น 1',
          en: 'Class 1',
        },
      },
      {
        value: '2+',
        label: {
          th: 'ประกันชั้น 2+',
          en: 'Class 2+',
        },
      },
      {
        value: '3',
        label: {
          th: 'ประกันชั้น 3',
          en: 'Class 3',
        },
      },
      {
        value: '3+',
        label: {
          th: 'ประกันชั้น 3+',
          en: 'Class 3+',
        },
      },
    ]

    const result = labeling('th')(data)

    expect(result).toEqual([
      {
        value: '1',
        label: 'ประกันชั้น 1',
      },
      {
        value: '2+',
        label: 'ประกันชั้น 2+',
      },
      {
        value: '3',
        label: 'ประกันชั้น 3',
      },
      {
        value: '3+',
        label: 'ประกันชั้น 3+',
      },
    ])
  })
})
