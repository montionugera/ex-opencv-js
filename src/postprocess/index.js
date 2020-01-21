import * as model from 'model'

import synonym from './synonym'
import partialCrop from './partial-crop'

export default async (buffer, scene, type = 'car_registration_upper') => {
  const { fields } = model.mapping[type]

  let result = synonym(fields, scene)
  result = await partialCrop(buffer, fields, result)

  return result
}
