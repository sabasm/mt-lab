const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose');

const userSchema = new Schema({
  curp: String,
  client: {
    type: Boolean,
    default: true
  },
  name: String,
  staff: {
    type: Object
  },
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
  emailVerificated: {
    type: Boolean,
    enum: [false, true],
    default: false
  },
  confirmationCode: {
    type: String,
    default: "none"
  },
  personalData: {
    imgURL: String,
    phone: {
      number: String,
      demo:{
        type: Boolean,
        default: false
      },
      verified: {
        type: Boolean,
        default: false
      }
    },
    state: String,
    city: String,
    age: Number,
    birthday: Date
  },
  fullUser: {
    type: Boolean,
    default: false
  },
  costumer: {
    pitayaCardOwner: {
      type: Boolean,
      default: false
    },
    status: {
      active: {
        type: Boolean,
        default: false
      },
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

  },
  card: {
    demo:{
      type: Boolean,
      default: false
    },
    number: Number,
    name:String,
    exp_year: Number,
    exp_month: Number,
    cvc: Number,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zip: Number,
      country: String
    }
  },

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