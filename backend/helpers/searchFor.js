const router = require('express').Router()
const User = require('../models/users/User')

//Search username

router.post('/', (req,res,next)=> {
  let {username} = req.body
  User.findOne({username})
  .then(response => {
    res.json({id:response._id,name:response.name})
  })
  
})

module.exports = router