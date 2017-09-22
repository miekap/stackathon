const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let tester

      beforeEach(() => {
        return User.create({
          email: 'test@test.com',
          password: 'testing'
        })
          .then(user => {
            tester = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(tester.correctPassword('testing')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(tester.correctPassword('wrongpw')).to.be.equal(false)
      })
    })
  })
})
