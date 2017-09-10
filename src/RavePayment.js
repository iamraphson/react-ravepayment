import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RavePayment extends Component {
  constructor (props) {
	  super(props);
	  this.state = {
		  text: this.props.text || 'Make Payment',
		  class: this.props.class || '',
		  metadata: this.props.metadata || [{}],
		  currency: this.props.currency || 'NGN',
		  country: this.props.country || 'NG',
		  customer_firstname: this.props.customer_firstname || '',
		  customer_lastname: this.props.customer_lastname || '',
		  custom_title: this.props.custom_title || '',
		  custom_description: this.props.custom_description || '',
		  custom_logo: this.props.custom_logo || ''
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
			custom_logo: this.state.custom_logo
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
	amount: PropTypes.string.isRequired, //in Naira
  ravePubKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

