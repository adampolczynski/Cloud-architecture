import 'dotenv/config'
import { MongoConnectionManager } from './src/db'
import { FastifyAppManager } from './src/fastify/server'

const FASTIFY_PORT = parseInt(process.env.FASTIFY_PORT || '')

FastifyAppManager.createApp()
FastifyAppManager.configure()
FastifyAppManager.run(FASTIFY_PORT)
  .then(async (fUrl) => {
    console.log(`Fastify server started at ${fUrl}`)
    await MongoConnectionManager.connect()
    console.log(`Connected with database`)
  })
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
