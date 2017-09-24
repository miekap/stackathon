import axios from 'axios'
import history from '../history'

const defaultCustomers = [
  {id: '', randomId: '', nightId: '', music: []}
]

const GET_CUSTOMERS = 'GET_CUSTOMERS'
const ADD_CUSTOMER = 'ADD_CUSTOMER'
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'

const getCustomers = customers => ({type: GET_CUSTOMERS, customers})
const addCustomer = customer => ({type: ADD_CUSTOMER, customer})
const updateCustomer = customer => ({type: UPDATE_CUSTOMER, customer})

export const loadCustomers = () => {
  return dispatch => {
    axios.get('/api/night')
    .then(res => res.data)
    .then(night => {
      return axios.get(`/api/fan/${night.randomId}`)
    })
    .then(res => res.data)
    .then(customers => {
      dispatch(getCustomers(customers))
      history.push(history.location)
    })
  }
}

export const addOrUpdateCustomer = (customers, fanId, nightId, music) => {
  let fan = {randomId: fanId, nightId: nightId, music: music}
  return dispatch => {
    (customers.filter(customer => customer.randomId == fanId).length)
      ? dispatch(updateCustomer(fan))
      : dispatch(addCustomer(fan))
  }
}

function customerChangedMind(customers, action) {
  let customerAtI = customers.filter(fan => {
      return fan.randomId === action.customer.randomId
    })[0]
  let i = customers.indexOf(customerAtI)
  let updatedCustomer = Object.assign(
      {},
      customerAtI,
      {music: action.customer.music}
    )
  return [...customers].slice(0, i)
    .concat(updatedCustomer, [...customers.slice(i + 1)])
}

export default function (state = defaultCustomers, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return action.customers
    case ADD_CUSTOMER:
      return [...state, action.customer]
    case UPDATE_CUSTOMER:
      return customerChangedMind(state, action)
    default:
      return state
  }
}
