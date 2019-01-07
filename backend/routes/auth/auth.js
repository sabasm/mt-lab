const router = require('express').Router()
const User = require('../../models/users/User')
const passport = require('../../helpers/passport')
const nodemailer = require('../../helpers/mailer')

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
      let promiseSign = new Promise ((resolve,reject)=>{
        console.log("este es el user del user register", user)
      // Client.create({
      //   email: user._id
      // })
      let characters = 'PitayaLabTokens';
      let confirmationCode = '';
      for (let i = 0; i < 25; i++) {
        confirmationCode += characters[Math.floor(Math.random() * characters.length)];
      }
      resolve({confirmationCode,id:user._id})

      })

      promiseSign.then( r=>{
        User.findOneAndUpdate({_id:r.id}, {confirmationCode:r.confirmationCode})
        .then(found => {
          console.log("este es el mail en el then del update", found.email)
          nodemailer.welcomeMail(found.email,found.name,r.confirmationCode)
          res.status(201).json(user)
        })
      })
        .catch(e => {
          console.log("no se pudo hacer el update a ", user)
          res.status(500).json(e)
        })
      
    })

    .catch(e=>res.status(500).json(e))

})

//Reset pass
router.post('/resetpass', (req, res, next) => {
  console.log(req.body)
  User.findOne({username:req.body.user})
  .then(user=>{
    console.log(user)
        user.setPassword(req.body.password, function(){
            user.save();
        });
        User.findByIdAndUpdate(user._id,{confirmationCode:null})
        .then(
          res.status(200).json({message: 'password reset successful'})
          )
},function(err){
    console.error(err);
})

})

router.post('/resetaccess', (req, res, next) => {
  let characters = 'PitayaLabReset12345678900987654321';
      let confirmationCode = '';
      for (let i = 0; i < 25; i++) {
        confirmationCode += characters[Math.floor(Math.random() * characters.length)];
      }
  User.findOneAndUpdate({
    email: req.body.email,
    },{
      salt:null,hash:null,confirmationCode
    })
    .then(user => {
      console.log(user)
      nodemailer.resetAccess(user.email,user.name,confirmationCode)
    })
    .catch(e => {
      console.log('fuck')
      console.log(e)
    })
    
});

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
  console.log(req.body.name)
  console.log(req.body.phone)
  console.log(req.body.city)
  console.log(req.body.curp)
  console.log(req.body.birthday)

  let _id = req.user._id
  let name = req.body.name
  let phone = {
    number: req.body.phone
  }
  let state = req.body.state
  let city = req.body.city
  let curp = req.body.curp
  let birthday = req.body.birthday
  var personalData = {
    curp,
    phone,
    state,
    city,
    birthday
  }


  console.log(personalData)
  User.findByIdAndUpdate(_id, {
      personalData,
      name
    })
    .then(e => e)
    .catch(e => r)
})

module.exports = router