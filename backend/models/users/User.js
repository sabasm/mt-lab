const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose');

const userSchema = new Schema({
  client: {
    type: Boolean,
    default: true
  },
  username: {
    type: String,
    unique: true,
    require: true,
    minlength: 6,
    maxlength: 12,
  },
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