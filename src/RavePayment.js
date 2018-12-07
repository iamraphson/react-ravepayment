import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class RavePayment extends Component {
  constructor(props) {
    super(props);
    this.payWithRave = this.payWithRave.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.state = {
      scriptLoaded: null,
      text: this.props.text || "Make Payment",
      class: this.props.class || "",
      currency: this.props.currency || "NGN",
      country: this.props.country || "NG"
    };
  }

  componentDidMount() {
    this.setState({
      scriptLoaded: new Promise(resolve => {
        this.loadScript(() => {
          resolve();
        });
      })
    });
  }

  loadScript(callback) {
    const script = document.createElement("script");
    script.src = !this.props.isProduction
      ? "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"
      : "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Others
      script.onload = () => {
        callback();
      };
    }
  }

  payWithRave() {
    this.state.scriptLoaded &&
      this.state.scriptLoaded.then(() => {
        window.getpaidSetup({
          customer_email: this.props.email,
          amount: this.props.amount,
          txref: this.props.reference,
          PBFPubKey: this.props.ravePubKey,
          onclose: () => this.props.close(),
          callback: response => this.props.callback(response),
          meta: this.props.metadata || [{}],
          currency: this.state.currency,
          country: this.state.country,
          customer_firstname: this.props.customer_firstname || "",
          customer_phone: this.props.customer_phone || "",
          customer_lastname: this.props.customer_lastname || "",
          custom_title: this.props.custom_title || "",
          custom_description: this.props.custom_description || "",
          custom_logo: tthis.props.custom_logo || "",
          subaccounts: this.props.subaccounts || [{}], //splits payments into subaccounts provided
          payment_method: this.props.payment_method || "both", //falls back to card and account if none is specified
          payment_plan: this.props.payment_plan || "", //the id of your payment plan
          redirect_url: this.props.redirect_url || "", //calls this url after successful payment
					hosted_payment: this.props.hosted_payment, //opens the modal in a new page
					campaign_id: this.props.campaign_id || "" //allows discounts
        });
      });
  }

  render() {
    const CustomTag = `${this.props.tag}`;

    return (
      <Fragment>
        <CustomTag
         className={this.state.class}
         onClick={this.payWithRave}
         >
          {this.state.text}
        </CustomTag>
      </Fragment>
    );
  }
}

RavePayment.defaultProps = {
  isProduction: false,
  tag: 'button'
};

RavePayment.propTypes = {
  isProduction: PropTypes.bool,
  text: PropTypes.string,
  class: PropTypes.string,
  metadata: PropTypes.array,
  currency: PropTypes.string,
  country: PropTypes.string,
  customer_firstname: PropTypes.string,
  customer_lastname: PropTypes.string,
  customer_phone: PropTypes.string,
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
	hosted_payment: PropTypes.number,
	campaign_id: PropTypes.string,
  tag: PropTypes.oneOf(['button', 'a', 'input'])
};

export default RavePayment;
