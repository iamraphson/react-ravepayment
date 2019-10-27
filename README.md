# react-ravepayment

A React library wrapper for implementing ReavePay Payment Gateway

## Demo

![Alt text](React_App.png?raw=true "Demo Image")

### Installation

```bash
npm install react-ravepayment --save
```

or

```bash
yarn add react-ravepayment --save
```

### Usage

### Hooks

```js
import React, { Component } from "react";
import { useRavePayment } from "react-ravepayment";

const config = {
  txref: "rave-123456",
  customer_email: "user@example.com",
  customer_phone: "234099940409",
  amount: 2000,
  PBFPubKey: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXX-X"
};

const App = () => {
  const { initializePayment } = useRavePayment(config);
  return (
    <div>
      <button onClick={() => initializePayment()}>Pay 2000</button>
    </div>
  );
};

export default App;
```

### Components

```js
import React, { Component } from "react";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";

const config = {
  txref: "rave-123456",
  customer_email: "user@example.com",
  customer_phone: "234099940409",
  amount: 2000,
  PBFPubKey: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXX-X",
  onSuccess: () => {},
  onClose: () => {}
};

const App = () => {
  return (
    <div>
      <RaveProvider {...config}>
        <RavePaymentButton>Pay 2000</RavePaymentButton>
      </RaveProvider>
    </div>
  );
};

export default App;
```

For more usage example [check](/example/src)

## API

See the [API reference](https://link-to-github-pages).

## Deployment

WHEN DEPLOYING TO PRODUCTION/LIVE SYSTEM, take note of the following;

1. Change isProduction attribute in the component tag to true i.e isProduction={true}
2. Change RavePay PUBLIC KEY
3. Ensure you implement [webhooks](https://flutterwavedevelopers.readme.io/docs/events-webhooks) to receive automatic updates when a transaction happens.

## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

This project follows the [all-contributors](https://allcontributors.org/) specification.
Contributions of any kind welcome!

### Issues

Looking to contribute? Look for the Good First Issue label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

## License

MIT
