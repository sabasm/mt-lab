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
router.post('/card', (req, res, next) => {
  console.log(req.data,res.data)
  customer = conekta.Customer.create({
    'name': 'Fulanito Pérez',
    'email': 'fulanito@conekta.com',
    'phone': '+52181818181',
    'payment_sources': [{
      'type': 'card',
      'token_id': token.id
    }]
  }, function(err, res) {
      if(err){
        console.log(err);
        return;
      }
      console.log(res.toObject());
  });

  order = conekta.Order.create({
    "line_items": [{
        "name": "Tacos",
        "unit_price": 1000,
        "quantity": 12
    }],
    "shipping_lines": [{
        "amount": 1500,
        "carrier": "FEDEX"
    }], //shipping_lines - physical goods only
    "currency": "MXN",
    "customer_info": {
     "customer_id": "cus_2fkJPFjQKABcmiZWz"
    },
    "shipping_contact":{
     "address": {
       "street1": "Calle 123, int 2",
       "postal_code": "06100",
       "country": "MX"
     }
   },  //shipping_contact - required only for physical goods
  "metadata": { "description": "Compra de creditos: 300(MXN)", "reference": "1334523452345" },
  "charges":[{
    "payment_method": {
      "type": "default"
    }  //payment_methods - use the customer's default - a card
       //to charge a card, different from the default,
       //you can indicate the card's source_id as shown in the Retry Card Section
  }]
}, function(err, res) {
    if(err){
      console.log(err);
      return;
    }
    console.log(res.toObject());
});

})

module.exports = router