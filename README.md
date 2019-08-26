# react-ravepayment

This is a ReactJS library for implementing RavePay Payment Gateway

### Demo
![Alt text](React_App.png?raw=true "Demo Image")

### Get Started

This React library provides a wrapper to add RavePay Payment to your React application

### Install
```bash
npm install react-ravepayment --save
```

### Usage

```javascript
    import React, { Component } from 'react'
    // import the library
	import RavePaymentModal from 'react-ravepayment'

    class App extends Component {

    		state = {
    		  key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXX-X", // RavePay PUBLIC KEY
    		  email: "foo@example.com", // customer email
    		  amount: 1000 // equals NGN 1000. Minimum amount allowed NGN 1 while on production or live system, it's 10
    	    }

    	  callback = (response) => {
    		  console.log(response);

    	  }

    	  close = () => {
    		  console.log("Payment closed");
    	  }

    	  getReference = () => {
    		  let text = "";
    		  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    		  for( let i=0; i < 10; i++ )
    			  text += possible.charAt(Math.floor(Math.random() * possible.length));

			  return text;
    	  }

    	render () {
        return (
          <div className='App'>
            <p className='App-intro'>
    	        <RavePaymentModal
    		        text="Make Payment"
    		        class="payButton"
    		        metadata={[{metaname:'Device', metavalue : 'IPhone X'}]}
    		        reference={this.getReference()}
    		        email={this.state.email}
    		        amount={this.state.amount}
    		        ravePubKey={this.state.key}
    		        callback={this.callback}
    		        close={this.close}
					isProduction={false}
					tag="button" {/*it can be button or a or input tag */}
    	        />
            </p>
          </div>
        )
      }
    }

    export default App
```

Please checkout [Rave Documentation](https://flutterwavedevelopers.readme.io/docs/rave-inline-1) for other available options you can add to the tag


## Parameters Table

| props        | parameter           | type | required  |
| ------------- |:-------------:| -----:| -----:|
| publickey      |  This is the publickey gotten from your [Live](https://rave.flutterwave.com/dashboard/settings/apis) or [Test](https://ravesandbox.flutterwave.com/dashboard/settings/apis) dashboard | `String` | Required
| encryptionkey      |  This is the encryption key that can be gotten from your [Live](https://rave.flutterwave.com/dashboard/settings/apis) or [Test](https://rave.flutterwave.com/dashboard/settings/apis)
| amount      |  This is the amount to be charged from card/account | `String` | Required
| email      |  This is the email of the customer | `String` | Required
| phone      |  This is the phone number of the customer | `String` | Not Required
| onSuccess      |  This is the function that receives data for a successful transaction | `Function` | Required
| onFailure      |  This is the function that receives data for a failed transaction | `Function` | Required
| onClose      |  This is the function that closes the payment window, it controls the screen that displays after payment | `Function` | Required
| country      |  This is the country you are transacting from eg. NG, GH,KE, ZA | `String` | Not Required (defaults to NG)
| production      |   Set to `true` if you want your transactions to run in the production environment otherwise set to `false`. Defaults to false  | `Boolean` | Not Required ('defaults to false')


## Deployment
WHEN DEPLOYING TO PRODUCTION/LIVE SYSTEM, take note of the following;
1) Change isProduction attribute in the component tag to true i.e isProduction={true}
2) Change RavePay PUBLIC KEY
3) Ensure you implement [webhooks](https://flutterwavedevelopers.readme.io/docs/events-webhooks) to receive automatic updates when a transaction happens.

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
