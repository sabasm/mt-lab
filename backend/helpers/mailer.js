const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth:{
    user:process.env.MAILER,
    pass:process.env.MAILP
    
  }
})

module.exports.welcomeMail = function (email, name,code){
  console.log("este email llegó al mailer ",email)
  transport.sendMail({
    subject:"Verifica tu cuenta en PitayaLabs Microcréditos",
    from:process.env.MAILER,
    to:email,
    html:`
    <h1>Bienvenido ${name}!</h1>
    <a href="http://localhost:3001/verify/${code}"> Activa tu cuenta aquí </a>
    <p>Estamos felices de tenerte!</p>
    `

  })
  .then(res=>{
    //console.log(res)
  })
  .catch(err=>{
    console.log(e)
  })


}


module.exports.resetAccess = function (email, name,code){

  console.log(email)
  transport.sendMail({
    subject:"Reestablece tu contraseña en PitayaLabs Microcréditos",
    from:process.env.MAILER,
    to:email,
    html:`
    <h1>Hola ${name}!</h1>
    <a href="http://localhost:3001/resetaccess/${code}"> reestablece tus datos de accesso aquí </a>
    <p>p.s. si no solicitaste reestablecer tu acceso, te recomendamos cambiar tu contraseña y no preocuparte por nada más ;)</p>
    <p>¡Esperamos estés teniendo un excelente día!<p/>
    `

  })
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(e)
  })


}
