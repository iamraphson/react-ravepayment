import React from 'react'
import { expect } from 'chai';
import { shallow, configure } from 'enzyme'
import RavePayment from '../../src/RavePayment'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const callback = (respone) => null
const close = () => null
const logo = 'http://via.placeholder.com/350x150'

const RaveWrapper = shallow(<RavePayment reference="rave-101"
                                          email="foobar@gmail.com"
                                          amount={1000}
                                          callback={callback}
                                          close={close}
                                          custom_logo={logo}
                                          ravePubKey="FLWPUBK-djfjjjeje" />)

describe('Rave Component', () => {
  it('Rave component renders span', () => {
    expect(RaveWrapper.find('span')).to.have.length(1)
  })

  it('Rave component renders button', () => {
    expect(RaveWrapper.find('button')).to.have.length(1)
  })

  it('should have an initial text, currency, country and logo',  () => {
    const { text, currency, country, custom_logo} = RaveWrapper.state()
    expect(text).to.equal('Make Payment')
    expect(currency).to.equal('NGN')
    expect(country).to.equal('NG')
    expect(custom_logo).to.equal(logo)
  })


})

