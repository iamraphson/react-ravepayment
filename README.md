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

Then go ahead and reference the Rave inline script in your index.html:
```html
<script src="//flw-pms-dev.eu-west-1.elasticbeanstalk.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
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
    		  amount: "1000" // equals NGN 1000. Minimum amount allowed NGN 1 while on production or live system, it's 10
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
    		        metadata={[{Device : 'IPhone X'}]}
    		        reference={this.getReference()}
    		        email={this.state.email}
    		        amount={this.state.amount}
    		        ravePubKey={this.state.key}
    		        callback={this.callback}
    		        close={this.close}
    	        />
            </p>
          </div>
        )
      }
    }
    
    export default App
```

Please checkout [Rave Documentation](https://flutterwavedevelopers.readme.io/v1.0/reference#introduction) for other available options you can add to the tag


## Deployment
WHEN DEPLOYING TO PRODUCTION/LIVE SYSTEM, take note of the following;
1) Change RavePay Inline script,you kept in the index.html to 
```javascript
<script src="//api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
```
2) Change RavePay PUBLIC KEY 

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