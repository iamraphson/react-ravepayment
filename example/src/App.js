import React  from 'react';
import {
    RaveProvider,
    RavePaymentButton,
    useRavePayment,
    RavePayment
} from './dist/index.es';
import logo from './logo.svg';
import './App.css';

const config = {
    txref: (new Date()).toString(),
    customer_email: "user@example.com",
    customer_phone:  "234099940409",
    amount: 2000,
    PBFPubKey: 'FLWPUBK_TEST-ad5ad78e73e23483375c1cf9a7f1fe2e5b0-X',
    production: false
};

const RaveHookExample = () => {
    const {initializePayment} = useRavePayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment()
            }}>Use Rave Hooks 2000</button>
        </div>
    );
}

function App() {
    const props = {
        ...config,
        onSuccess: () => {},
        onClose: () => {}
    };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
        <RaveProvider {...props}>
            <RavePaymentButton>Pay 2000</RavePaymentButton>
            <RavePayment {...props}>
                {({ initializePayment }) => <button onClick={() => initializePayment()}>Use render props 2000</button>}
            </RavePayment>
        </RaveProvider>
        <RaveHookExample />
    </div>
  );
}

export default App;
