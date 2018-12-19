import config from './config'

const conektaHelper = {
  initConekta: () => {
    window.Conekta.setPublicKey(config.conekta.staging.publicKey)
  },
  getCardBrand: (cardNumber) => {
    return window.Conekta.card.getBrand(cardNumber)
  },
  validateCardNumber: (cardNumber) => {
    return window.Conekta.card.validateNumber(cardNumber)
  },
  validateCvc: (cvc) => {
    return window.Conekta.card.validateCVC(cvc)
  },
  validateExpirationDate: (expiryMonth, expiryYear) => {
    return window.Conekta.card.validateExpirationDate(expiryMonth, `20${expiryYear}`)
  },
  tokenize: (cardNumber, cardHolder, expiryMonth, expiryYear, cvc, successCallback, errorCallback) => {
    const tokenParams = {
      card: {
        number: cardNumber,
        name: cardHolder,
        exp_year: expiryYear,
        exp_month: expiryMonth,
        cvc
      }
    }
    window.Conekta.Token.create(tokenParams, successCallback, errorCallback)
  }
}

export default conektaHelper