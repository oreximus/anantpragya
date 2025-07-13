/**
 * Redis Cache
 */
const redis = require("redis")
const config = require("_config/config.json")
const logger = require("_helpers/logger")

let client

async function connectRedis() {
  try {
    client = redis.createClient({
      url: `redis://${config.redis.host}:${config.redis.port}`,
      password: config.redis.password,
    })

    client.on("error", (err) => logger.error("Redis Client Error", err))
    client.on("connect", () => logger.info("Redis client connected"))
    client.on("ready", () => logger.info("Redis client ready to use"))

    await client.connect()
  } catch (err) {
    logger.error("Failed to connect to Redis", err)
  }
}

function getClient() {
  if (!client) {
    logger.warn("Redis client not initialized. Call connectRedis() first.")
    return null
  }
  return client
}

module.exports = {
  connectRedis,
  getClient,
}
