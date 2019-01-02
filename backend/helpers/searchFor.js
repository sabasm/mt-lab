const router = require('express').Router()
const User = require('../models/users/User')

//Search username

router.post('/', (req,res,next)=> {
  console.log(req.body)
  console.log('searching on backend')
  let {username} = req.body
  console.log('got ', username, 'as parameter')
  User.findOne({username})
  .then(response => {
    res.json({id:response._id,name:response.personalData.name})
  })
  
})

module.exports = router