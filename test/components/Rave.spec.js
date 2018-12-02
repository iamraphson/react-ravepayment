import React from "react";
import { expect } from "chai";
import { configure, mount } from "enzyme";
import RavePayment from "../../src/RavePayment";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const callback = response => null;
const close = () => null;
const logo = "http://via.placeholder.com/350x150";
const reference = "rave-101";
const email = "foobar@gmail.com";
const key = "FLWPUBK-djfjjjeje";
const amount = 1000;
const btnText = "Pay me, my money";

describe("Rave Component", () => {
  it("Rave component renders button", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    expect(RaveWrapper.find("button")).to.have.length(1);
  });

  it("Rave component renders custom tag", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
        tag="a"
      />
    );

    expect(RaveWrapper.find("button")).to.have.length(0);
    expect(RaveWrapper.find("a")).to.have.length(1);
  });

  it("should have customize button text", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        text={btnText}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    expect(RaveWrapper.text()).to.contain(btnText);
  });

  it("should have an initial text, currency, country and logo", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    const { text, currency, country } = RaveWrapper.state();
    expect(text).to.equal("Make Payment");
    expect(currency).to.equal("NGN");
    expect(country).to.equal("NG");
  });

  it("should have props for reference, email, amount, callback, close, custom_logo, ravePubKey and not for custom_description, metadata", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    expect(RaveWrapper.props().reference).to.not.be.undefined;
    expect(RaveWrapper.props().email).to.not.be.undefined;
    expect(RaveWrapper.props().amount).to.not.be.undefined;
    expect(RaveWrapper.props().callback).to.not.be.undefined;
    expect(RaveWrapper.props().close).to.not.be.undefined;
    expect(RaveWrapper.props().custom_logo).to.not.be.undefined;
    expect(RaveWrapper.props().ravePubKey).to.not.be.undefined;
    expect(RaveWrapper.props().custom_description).to.be.undefined;
    expect(RaveWrapper.props().metadata).to.be.undefined;
  });

  it("Calls payWithRave when button is clicked", done => {
    const payWithRaveSpy = sinon.mock(RavePayment.prototype);
    payWithRaveSpy.expects("payWithRave").once();
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    RaveWrapper.find("button").simulate("click");
    payWithRaveSpy.restore();
    payWithRaveSpy.verify();
    done();
  });

  it("Loaded Paystack script", () => {
    const RaveWrapper = mount(
      <RavePayment
        reference={reference}
        email={email}
        amount={amount}
        callback={callback}
        close={close}
        custom_logo={logo}
        ravePubKey={key}
      />
    );
    const { scriptLoaded } = RaveWrapper.state();
    expect(scriptLoaded).to.not.be.null;
  });
});
