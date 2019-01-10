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

router.get('/verify/aSDAha4jfasddda', (req, res, next) => {
  const confirmationCode = "aSDAha4jfasddda"
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
  let updates = req.body.updates
  User.findOneAndUpdate({_id:req.body.id},{...updates})
    .then(r => {res.status(200).json({r})})
    .catch(e=>console.log(e))
})

module.exports = router