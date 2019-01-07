const router = require('express').Router()
const User = require('../models/users/User')

//createStaff

router.post('/createstaff', (req, res, next) => {
  let staff = {
    documents: req.body.documents,
    mail: req.body.mail,
    position: req.body.position,
    access: req.body.access,
    pin: 1234567890,
    convertedBy: req.body._id
  }
  User.findOneAndUpdate({
      _id: req.body.id
    }, {
      client: false,
      staff
    })
    .then(r => {})
})

router.get('/verify/:code', (req, res, next) => {
  const confirmationCode = req.params.code
  User.findOneAndUpdate({
      confirmationCode
    },
    {
      emailVerificated: true
    }
    )
    .then(user => {
      console.log(user)
    })
    .catch(e => {
      console.log('fuck')
      console.log(e)
    })
    
});

router.post('/changes', (req, res, next) => {
  console.log("ESTO LLEGA AL BACKEND DEL BODY", req.body)
  let updates = req.body.updates
  console.log("estos son los updates updates",updates," debe ser un objeto")

  console.log("esto es el change al find and update", ({_id:req.body.id,...updates}))

  User.findOneAndUpdate({_id:req.body.id},{...updates})
    .then(r => {console.log("ya es full user? :D = ",r.fullUser)})
})

module.exports = router