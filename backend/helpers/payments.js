const router = require('express').Router()
var conekta = require ('conekta');
conekta.api_key = process.env.CPRIK;
conekta.api_version = '2.0.0'

//Middleware check
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.status(403).json({
    message: 'Área privada'
  })
}

//CARD PAYMENTS
router.post('/card', (req,res,next)=> {
  token_id = req.body.token.id
  name = req.body.loggedUser.personalData.name
  email = req.body.loggedUser.email
  phone = req.body.loggedUser.personalData.phone.number
  userid=req.body.loggedUser._id
  customer = conekta.Customer.create({
    name,
    email,
    phone,
    custom_id:userid,
    'payment_sources': [{
      'type': 'card',
      token_id}]
  }, function(err, res) {
      if(err){
        console.log(err);
        return;
      }
      console.log(res.toObject());
  });
//   order = conekta.Order.create({
//     "line_items": [{
//         "name": "Tacos",
//         "unit_price": 1000,
//         "quantity": 12
//     }],
//     "shipping_lines": [{
//         "amount": 1500,
//         "carrier": "FEDEX"
//     }], //shipping_lines - physical goods only
//     "currency": "MXN",
//     "customer_info": {
//      "customer_id": "cus_2jpMvNooSutHhBy9q"
//     },
//     "shipping_contact":{
//      "address": {
//        "street1": "Calle 123, int 2",
//        "postal_code": "06100",
//        "country": "MX"
//      }
//    },  //shipping_contact - required only for physical goods
//   "metadata": { "description": "Compra de creditos: 300(MXN)", "reference": "1334523452345" },
//   "charges":[{
//     "payment_method": {
//       "type": "default"
//     }  //payment_methods - use the customer's default - a card
//        //to charge a card, different from the default,
//        //you can indicate the card's source_id as shown in the Retry Card Section
//   }]
// }, function(err, res) {
//     if(err){
//       console.log(err);
//       return;
//     }
//     console.log(res.toObject());
//     console.log("ID: " + order.id);
// console.log("Status: " + order.payment_status);
// console.log("$" + (order.amount/100) + order.currency);
// console.log("Order");
// console.log(order.line_items[0].quantity + " - "
//             + order.line_items[0].name + " - "
//             + (order.line_items[0].unit_price/100));
// console.log("Payment info");
// console.log("Code: " + order.charges[0].payment_method.auth_code);
// console.log("Card info: "
//               + order.charges[0].payment_method.name + " - "
//               + order.charges[0].payment_method.last4 + " - "
//               + order.charges[0].payment_method.brand + " - "
//               + order.charges[0].payment_method.type);
// });
})


module.exports = router