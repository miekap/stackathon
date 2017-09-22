import axios from 'axios'
import history from '../history'
import {getLocation, randomId, getDistance} from '../functions'

const CREATE_FAN = 'CREATE_FAN'
const UPDATE_FAN = 'UPDATE_FAN'
const GET_FAN = 'GET_FAN'
const REMOVE_FAN = 'REMOVE_FAN'

const defaultFan = {}

const createFan = fan => ({type: CREATE_FAN, fan})
const updateFan = fan => ({type: UPDATE_FAN, fan})
const getFan = fan => ({type: GET_FAN, fan})
const removeFan = () => ({type: REMOVE_FAN})

export const generateFan = (nightId) =>
  dispatch =>
    getLocation()
    .then(res => res.data)
    .then(res => {
      return axios.post('/api/fan', {
        randomId: randomId(4),
        lat: res.location.lat,
        lng: res.location.lng,
        accuracy: res.accuracy,
        nightId: nightId
      })
    })
    .then(res => {
      dispatch(createFan(res.data))
      console.log(res.data)
      // history.push('/NIGHT/FAN')
    })
    .catch(error =>
      dispatch(createFan({error})))

export default function (state = defaultFan, action) {
  switch (action.type) {
    case CREATE_FAN:
      return action.fan
    case UPDATE_FAN:
      return action.fan
    case GET_FAN:
      return action.fan
    case REMOVE_FAN:
      return defaultFan
    default:
      return state
  }
}
