const { buildSchema } = require('graphql')

module.exports = buildSchema(`


type Booking {
    _id: ID!
    event: Event!
    user: User
    createdAt: String!
    updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  username: String!
  password: String
  createdEvents: [Event!]
}

input UserInput {
  username: String!
  password: String!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: ID!
}

type AuthData {
  username: String!
  token: String!
}

type RootQuery {
  events: [Event!]!
  bookings: [Booking!]!
  login(username: String, password: String) : AuthData!
}

type RootMutation {
  createEvent(eventInput: EventInput) : Event
  createUser(userInput: UserInput) : User
  bookEvent(eventID: ID!) : Booking
  cancelBooking(bookingID: ID!) : String
}

schema {
  query: RootQuery
  mutation: RootMutation
}

`)
