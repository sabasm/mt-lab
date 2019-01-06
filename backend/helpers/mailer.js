const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth:{
    user:"fixtermailer@gmail.com",
    pass:"Superman77"
  }
})

function welcomeMail(email, name,code){
  transport.sendMail({
    bcc:email,
    subject:"Verifica tu cuenta en PitayaLabs Microcréditos",
    from:"smma1992@gmail.com",
    html:`
    <h1>Bienvenido ${name}!</h1>
    <a href="http://localhost:3001/verify/${code}"> Activa tu cuenta aquí </a>
    <p>Estamos felices de tenerte!</p>
    `

  })
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(e)
  })


}

module.exports = {welcomeMail}