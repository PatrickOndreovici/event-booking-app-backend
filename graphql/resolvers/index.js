const Event = require('../../models/Event')
const User = require('../../models/User')
const Booking = require('../../models/Booking')

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event.creator),
        }
      })
    })
    .catch((err) => {
      throw err
    })
}

const singleEvent = (eventID) => {
  return Event.findById(eventID)
    .then((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator),
      }
    })
    .catch((err) => {
      throw err
    })
}

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents),
      }
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this, event._doc.creator),
          }
        })
      })
      .catch((err) => {
        throw err
      })
  },
  bookings: () => {
    return Booking.find()
      .then((bookings) => {
        return bookings.map((booking) => {
          return {
            ...booking._doc,
            _id: booking.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
          }
        })
      })
      .catch((err) => {
        console.log('Fadfadfads')
        throw err
      })
  },
  createEvent: (args, req) => {
    if (!req.isAuth) {
      throw new Error('You are not authorized !')
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userID,
    })
    return event
      .save()
      .then((result) => {
        return { ...result._doc, _id: result.id } // result has a lot of metadata, with _doc i will return just the fields
      })
      .catch((err) => {
        throw err
      })
  },

  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, saltRounds)
      .then((hash) => {
        const user = new User({
          username: args.userInput.username,
          password: hash,
        })
        return user.save()
      })
      .then((result) => {
        return { ...result._doc, _id: result.id }
      })
      .catch((err) => {
        throw err
      })
  },

  bookEvent: (args, req) => {
    if (!req.isAuth) {
      throw new Error('You are not authorized !')
    }
    const eventID = args.eventID
    return Event.findById(eventID)
      .then((event) => {
        if (!event) {
          throw new Error("Event doesn't exist")
        } else {
          const booking = new Booking({
            event: event,
            user: req.userID,
          })
          return booking.save()
        }
      })
      .then((booking) => {
        return {
          event: singleEvent.bind(this, eventID),
          user: user.bind(this, req.userID),
          createdAt: booking.createdAt.toISOString(),
          updatedAt: booking.updatedAt.toISOString(),
        }
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  },

  cancelBooking: (args) => {
    const bookingID = args.bookingID
    return Booking.deleteOne({ _id: bookingID })
      .then(() => {
        return 'Deleted'
      })
      .catch((err) => {
        throw err
      })
  },

  login: (args) => {
    const { username, password } = args
    return User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          throw new Error("User does't exist !")
        } else {
          return bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              throw new Error('Invalid password')
            } else {
              const token = jwt.sign(
                { username: username, userID: user._id },
                'shhhhh'
              )
              return {
                username: username,
                token: token,
              }
            }
          })
        }
      })
      .catch((err) => {
        throw err
      })
  },
}
