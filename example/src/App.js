import React from 'react';
import { RaveProvider, RavePaymentButton, useRavePayment, RavePayment } from 'react-ravepayment';
import './App.css';


const config = {
  txref: "rave-123456",
  customer_email: "user@example.com",
  customer_phone:  "234099940409",
  amount: 2000,
  PBFPubKey: "FLWPUBK-24b72aebb821aea177483039677df9d3-X",
};

const RaveHookExample = () => {
  const {initializePayment} = useRavePayment(config);
  return (
    <div>
      <button onClick={() => initializePayment()}>Use Rave Hooks 2000</button>
    </div>
  );
}

function App() {
  const props = {
    ...config,
    onSuccess: () => {},
    onClose: () => {}
  }
  return (
    <div className="App">
      <RaveProvider {...props}>
        <RavePaymentButton>Pay 2000</RavePaymentButton>
        <RavePayment>
          {({ initializePayment }) => <button onClick={() => initializePayment()}>Use render props 2000</button>}
        </RavePayment>
      </RaveProvider>
      <RaveHookExample />
    </div>
  );
}

export default App;
