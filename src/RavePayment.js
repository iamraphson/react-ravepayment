import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RavePayment extends Component {
  constructor (props) {
	  super(props);
	  this.state = {
		  text: this.props.text || 'Make Payment',
		  class: this.props.class || '',
		  metadata: this.props.metadata || [{}],
		  currency: this.props.currency || 'GHS',
		  country: this.props.country || 'GH',
		  customer_firstname: this.props.customer_firstname || '',
		  customer_lastname: this.props.customer_lastname || '',
		  custom_title: this.props.custom_title || '',
		  custom_description: this.props.custom_description || '',
			custom_logo: this.props.custom_logo || '', //adds custom logo to the modal
			subaccounts: this.props.subaccounts || [{}], //splits payments into subaccounts provided
			payment_method: this.props.payment_method || 'both', //falls back to card and account if none is specified
			payment_plan: this.props.payment_plan || '', //the id of your payment plan
			redirect_url: this.props.redirect_url || '', //calls this url after successful payment
			hosted_payment: this.props.hosted_payment //opens the modal in a new page

	  }
  }

	payWithRave = () => {
		window.getpaidSetup({
			customer_email:this.props.email,
			amount:this.props.amount,
			txref: this.props.reference,
			PBFPubKey: this.props.ravePubKey,
			onclose: () => this.props.close(),
			callback: response => this.props.callback(response),
			meta: this.state.metadata,
			currency: this.state.currency,
			country: this.state.country,
			customer_firstname: this.state.customer_firstname,
			customer_lastname: this.state.customer_lastname,
			custom_title: this.state.custom_title,
			custom_description: this.state.custom_description,
			custom_logo: this.state.custom_logo,
			subaccounts: this.state.subaccounts,
			payment_method: this.state.payment_method,
			payment_plan: this.state.payment_plan,
			redirect_url: this.state.redirect_url,
			hosted_payment: this.state.hosted_payment
			
		})
	}


  render () {
    return (
      <span>
        <button className={this.state.class} onClick={this.payWithRave} >
          {this.state.text}
        </button>
      </span>
    )
  }
}

RavePayment.propTypes = {
  text: PropTypes.string,
  class: PropTypes.string,
	metadata: PropTypes.array,
	currency: PropTypes.string,
	country: PropTypes.string,
	customer_firstname: PropTypes.string,
	customer_lastname: PropTypes.string,
	custom_title: PropTypes.string,
	custom_description: PropTypes.string,
	custom_logo: PropTypes.string,
	reference: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired, //in Naira
  ravePubKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired,
	subaccounts: PropTypes.array,
	payment_method: PropTypes.string,
	payment_plan: PropTypes.number,
	redirect_url: PropTypes.string,
	hosted_payment: PropTypes.number
	
}

