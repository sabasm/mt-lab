const router = require('express').Router()
const User = require('../../models/users/User')
const passport = require('../../helpers/passport')

//Middleware check
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.status(403).json({
    message: 'Área privada'
  })
}

//Signup
router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => {
      // Client.create({
      //   email: user._id
      // })
      res.status(201).json(user)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})
//login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json(info)
    if (!user) return res.status(404).json(info)
    req.login(user, (err) => {
      console.log(err)
      return res.status(201).json(user)
    })
  })(req, res, next)
})

//logout
router.get('/logout', (req, res, next) => {
  req.logOut()
  res.status(200).json({
    message: 'Sesión cerrada con éxito'
  })
})

//profile
router.get('/profile', isAuth, (req, res, next) => {
  return res.status(201).json(req.user)
})

//profile/edit
router.post('/profile/edit', (req, res, next) => {
  console.log("user ",req.user._id)
  console.log(req.body.name)
  console.log(req.body.phone)
  console.log(req.body.city)
  console.log(req.body.imgURL)
  console.log(req.body.birthday)

  let _id = req.user._id
  console.log(_id)
  let name = req.body.name
  let phone = {number:req.body.phone}
  let city = req.body.city
  let imgURL = req.body.imgURL
  let birthday = req.body.birthday
  var personalData= {
    imgURL,
    phone,
    city,
    birthday
  }


  console.log(personalData)
  User.findByIdAndUpdate(_id, {personalData,name})
  .then(e=>console.log(e))
  .catch(e=>console.log(e))
})
module.exports = router