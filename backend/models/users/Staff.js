const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
 email: {
  type: Schema.Types.ObjectId,
  ref: 'email'
  },
  documents: [String],
  position:String,
  access:{
    type: String,
    enum: ["Confianza","RH","TechSupport","Temporal"],
    default: "Temporal"
  },
  pin:{type:Number, minlength:7, maxlength:10,default:1234567890}
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model('Staff', staffSchema)