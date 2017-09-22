import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserHome} from './user-home'

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email={'test@test.com'} />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome test@test.com')
  })
})
