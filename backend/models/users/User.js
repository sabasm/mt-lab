const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose');

const userSchema = new Schema({
  client: {
    type: Boolean,
    default: true
  },
  staff:{type: Object},
  username: {
    type: String,
    unique: true,
    require: true,
    minlength: 6,
    maxlength: 12,
  },
  documents: [String],
  email: {
      type: String,
      unique: true,
      required: true

    },

    verifiedEmail: {
      type: Boolean,
      default: false
  },
  personalData: {
    imgURL: String,
    name: {
      type: String
    },
    phone: {
      number: String,
      verified: {
        type: Boolean,
        default: false
      }
    },
    token: String,
    city: String,
    age: Number,
    birthday: Date
  },
  costumer:{
    status: {
      tax: {
        type: Number,
        default: 20
      },
      maxAmount: {
        type: Number,
        default: 1000
      },
      grantedAmount: {
        type: Number,
        default: 0
      },
      paymentsLeft: {
        type: Number
      },
      paymentsType: {
        type: String,
        enum: ['weekly', 'biweekly', 'monthly'],
        default: 'monthly'
      }
    },
    paymentsDates: [Date],
    conektaCostumerId: String,
    social: {
      invites: [String]
    }

  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

userSchema.plugin(passport, {
  emailField: 'email'
})


module.exports = mongoose.model('User', userSchema)