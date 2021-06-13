const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new Schema(
  {
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
) // add timestamps to know in mongodb, when a booking was created or updated

module.exports = mongoose.model('Booking', bookingSchema)
