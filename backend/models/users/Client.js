const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: 'email',
    require:true

  },
  status: {
    tax: {
      type: Number,
      default: 10
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
    },
    paymentsDates: [Date],
    documents: [String]
  },
  social: {
    invites: [{
      type: Schema.ObjectId
    }],
    code: String
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model('Client', clientSchema)