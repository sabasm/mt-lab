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
  console.log("ESTO ES REQ = ",req)
  console.log("ESTO ES RES = ",res)
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

module.exports = router