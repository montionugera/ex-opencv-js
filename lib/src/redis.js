import redis from 'node-redis'
import { Nohm as nohm } from 'nohm'

let redisClient

export const connect = () => new Promise((resolve) => {
  if (redisClient) {
    resolve(nohm)
    return
  }

  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  })
  
  redisClient.on('ready', () => {
    nohm.setClient(redisClient)
    resolve(nohm)
  })

  redisClient.on('error', console.log)
})

export const disconnect = () => new Promise((resolve) => {
  if (redisClient) {
    redisClient.quit(resolve)
  }
})

export default nohm
