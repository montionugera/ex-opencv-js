import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.GATEWAY_URL,
})

export default async (name, {
  header, data, token, method = 'post', ...config
} = {}) => {
  if (process.browser || token) {
    const response = await instance({
      url: name,
      data,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...header,
      },
      ...config,
    })

    return response.data
  }

  return global.broker.call(name, data)
}
