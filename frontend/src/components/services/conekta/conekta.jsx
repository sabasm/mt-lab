import React, { Component } from "react";
import CardForm from "./cardForm";
import axios from "axios";
class Conekta extends Component {
  state = {
    card: {}
  };

  validate = e => {
    e.preventDefault();
    const { card } = this.state;
    window.Conekta.setPublicKey("key_OTFCzz4ZjQPcxvLtoqnJoqA");
    console.log(window.Conekta.card.validateNumber(card.number));
    console.log(
      window.Conekta.card.validateExpirationDate(card.exp_month, card.exp_year)
    );
    console.log(window.Conekta.card.validateCVC(card.cvc));
    console.log(window.Conekta.card.getBrand(card.number));
    console.log(card + " " + { ...card });
    var tokenParams = {
      card: {
        number: card.number,
        name: card.name,
        exp_year: card.exp_year,
        exp_month: card.exp_month,
        cvc: card.cvc,
        address: {
          street1: card.street1,
          street2: card.street2,
          city: card.city,
          state: card.state,
          zip: card.zip,
          country: card.country
        }
      }
    };
    var conektaSuccessResponseHandler = function(token) {
      // Do something on sucess
      // you need to send the token to the backend.
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (!loggedUser) this.props.history.push("/login");
      axios
        .post("http://localhost:3000/pay/card", { token,loggedUser })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(e => e.response);
    };

    var conektaErrorResponseHandler = function(error) {
      // Do something on error
    };
    window.Conekta.Token.create(
      tokenParams,
      conektaSuccessResponseHandler,
      conektaErrorResponseHandler
    );
  };

  handleText = e => {
    const { card } = this.state;
    const field = e.target.name;
    card[field] = e.target.value;
    this.setState({ card });
  };

  render() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) this.props.history.push("/auth/login");
    return (
      <div className="landing-front">
        <CardForm validate={this.validate} handleText={this.handleText} />
      </div>
    );
  }
}

export default Conekta;
