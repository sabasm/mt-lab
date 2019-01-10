import React, { Component } from "react";
import CardForm from "./cardForm";
//import axios from "axios";
import { API_Update } from "../database";
class Conekta extends Component {
  state = {
    user:{}
  };
  componentWillMount(){
    let local = JSON.parse(localStorage.getItem('loggedUser'))
    if (!local)this.props.history.push("/")
  this.setState({user:local})
}

  validate = e => {
    e.preventDefault();

    console.log(this.state.user)
   // const { card } = this.state;
   let r=e.target
    var card = {
      number: r.number.value,
      name: r.name.value,
      exp_year: r.exp_year.value,
      exp_month: r.exp_month.value,
      cvc: r.cvc.value,
      address: {
        street1: r.street1.value,
        street2: r.street2.value,
        city: r.city.value,
        state: r.state.value,
        zip: r.zip.value,
        country: r.country.value
      }
    };
    const updates= {card}
    
    const id = {_id:this.state.user._id}
    let changes = { id , updates}
     API_Update(changes)
         .then(r => {
          this.props.history.push("/profile");
         })

    //   e.preventDefault();
    //   const { card } = this.state;
    //   window.Conekta.setPublicKey("key_OTFCzz4ZjQPcxvLtoqnJoqA");
    //   console.log(window.Conekta.card.validateNumber(card.number));
    //   console.log(
    //     window.Conekta.card.validateExpirationDate(card.exp_month, card.exp_year)
    //   );
    //   console.log(window.Conekta.card.validateCVC(card.cvc));
    //   console.log(window.Conekta.card.getBrand(card.number));
    //   console.log(card + " " + { ...card });
    //   var tokenParams = {
    //     card: {
    //       number: card.number,
    //       name: card.name,
    //       exp_year: card.exp_year,
    //       exp_month: card.exp_month,
    //       cvc: card.cvc,
    //       address: {
    //         street1: card.street1,
    //         street2: card.street2,
    //         city: card.city,
    //         state: card.state,
    //         zip: card.zip,
    //         country: card.country
    //       }
    //     }
    //   };
    //   var conektaSuccessResponseHandler = function(token) {
    //     // Do something on sucess
    //     // you need to send the token to the backend.
    //     const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    //     if (!loggedUser) this.props.history.push("/login");
    //     axios
    //       .post("http://localhost:3000/pay/card", { token,loggedUser })
    //       .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //       })
    //       .catch(e => e.response);
    //   };

    //   var conektaErrorResponseHandler = function(error) {
    //     // Do something on error
    //   };
    //   window.Conekta.Token.create(
    //     tokenParams,
    //     conektaSuccessResponseHandler,
    //     conektaErrorResponseHandler
    //   );
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
        <CardForm validate={this.validate}  handleText={this.handleText} />
      </div>
    );
  }
}

export default Conekta;
