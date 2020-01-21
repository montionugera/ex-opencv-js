import redis from 'redis-js'
import { Nohm as nohm } from 'nohm'

export const connect = async () => {
  const redisClient = redis.createClient()

  redisClient.connected = true

  nohm.setClient(redisClient)
}

export const disconnect = () => Promise.resolve()

export default nohm
