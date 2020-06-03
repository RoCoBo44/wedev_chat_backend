import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import schema from './schema'
import resolvers from './schema/resolvers'
import models from './models'
import { dedentBlockStringValue } from 'graphql/language/blockString'

require('dotenv').config()

const port = process.env.PORT || 3001

const app = express()

const server = new ApolloServer({
  ...schema,
  resolvers,
  context: { models },
  instrospection: true,
  playground: true,
  tracing: true
})

const Sequelize = require('sequelize');


server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})
