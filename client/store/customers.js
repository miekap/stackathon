import axios from 'axios'
import history from '../history'

const defaultCustomers = [
  { id: '',
    randomId: '',
    nightId: '',
    music: [],
    downloadAllowed: false
  }
]

const GET_CUSTOMERS = 'GET_CUSTOMERS'
const ADD_CUSTOMER = 'ADD_CUSTOMER'
const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
const ALLOW_DOWNLOAD = 'ALLOW_DOWNLOAD'

const getCustomers = customers => ({type: GET_CUSTOMERS, customers})
const addCustomer = customer => ({type: ADD_CUSTOMER, customer})
const updateCustomer = customer => ({type: UPDATE_CUSTOMER, customer})
const allowDownload = customer => ({type: ALLOW_DOWNLOAD, customer})

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

export const permissionToDownload = (fanId) => {
  let fan = {randomId: fanId}
  return dispatch => {
    axios.put('/api/fan/allow', fan)
    .then(() => dispatch(allowDownload(fan)))
    .catch(error => dispatch(allowDownload({error})))
  }
}

function updateCustomerInArray(customers, action, key, val) {
  let customerAtI = customers.filter(fan => {
      return fan.randomId === action.customer.randomId
    })[0]
  let i = customers.indexOf(customerAtI)
  let obj = {}
  val
    ? obj[key] = val
    : obj[key] = action.customer[key]
  let updatedCustomer = Object.assign({}, customerAtI, obj)
  return [...customers].slice(0, i)
    .concat(updatedCustomer, [...customers.slice(i + 1)])
}

function customerChangedMind(customers, action) {
  return updateCustomerInArray(customers, action, 'music')
}

function permissionGranted(customers, action) {
  return updateCustomerInArray(customers, action, 'downloadAllowed', true)
}

export default function (state = defaultCustomers, action) {
  switch (action.type) {
    case GET_CUSTOMERS:
      return action.customers
    case ADD_CUSTOMER:
      return [...state, action.customer]
    case UPDATE_CUSTOMER:
      return customerChangedMind(state, action)
    case ALLOW_DOWNLOAD:
      return permissionGranted(state, action)
    default:
      return state
  }
}
