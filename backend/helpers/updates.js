const router = require('express').Router()
const User = require('../models/users/User')

//createStaff

router.post('/createstaff', (req,res,next)=> {
  let staff={
    documents:req.body.documents,
    mail:req.body.mail,
    position:req.body.position,
    access:req.body.access,
    pin:1234567890,
    convertedBy:req.body._id
  }
  console.log(staff)
  User.findOneAndUpdate({_id:req.body.id}, {client:false,staff})
  .then(r=>{
    console.log(r)
  })
  // console.log('searching on backend')
  // let {username} = req.body
  // console.log('got ', username, 'as parameter')
  //User.findByIdAndUpdate({ _id: req.id },{username})
  // .then(response => {
  //   res.json({id:response._id,name:response.personalData.name})
  // })


  // userSchema.methods.createStaff = function(){
  //   this.client=false
  //   this.staff={
  //     documents: [String],
  //     mail:String,
  //     position:String,
  //     access:{
  //       type: Number,
  //       enum: [5,4,3,2,1],
  //       default: 1
  //     },
  //     pin:{type:Number, minlength:7, maxlength:10,default:1234567890},
  //     convertedBy:String
  //   }
  // }
})

module.exports = router