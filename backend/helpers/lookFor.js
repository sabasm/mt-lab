const router = require('express').Router()
const User = require('../models/users/User')

//Search username

router.post('/', (req,res,next)=> {
  console.log(req.body)
  console.log('looking on backend')
  let {lookingFor} = req.body
  console.log('got ', req.body, 'as parameter')
  User.findOne(req.body)
  .then(response => {
    response ? res.json({exist:true}) : res.json({exist:false})
    response ? console.log("Ya existe") : console.log("Continuar")
  })
  .catch(response=>{
  })
})

module.exports = router