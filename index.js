const express = require('express')

const bodyParser = require('body-parser')

const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true,
  })
)

mongoose
  .connect(
    'mongodb+srv://PatrickOndreovici:Patrick242004@cluster0.btnkm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running')
    })
  })
  .catch((err) => {
    console.log(err)
  })
