import axios from 'axios'
import history from '../history'
import {getLocation, generateId} from '../functions'

const defaultNight = {
  randomId: 'notrandom',
  lat: null,
  lng: null,
  accuracy: null,
  active: false
}

const CREATE_NIGHT = 'CREATE_NIGHT'
const GET_NIGHT = 'GET_NIGHT'
const DEACTIVATE_NIGHT = 'DEACTIVATE_NIGHT'

const createNight = night => ({type: CREATE_NIGHT, night})
const getNight = night => ({type: GET_NIGHT, night})
const deactivateNight = () => ({type: DEACTIVATE_NIGHT})

export const generateNight = () => {
  return dispatch => {
    return getLocation()
    .then(res => res.data)
    .then(res => {
      return axios.post(`/api/night`, {
        randomId:  generateId(3),
        lat: res.location.lat,
        lng: res.location.lng,
        accuracy: res.accuracy,
        active: true
      })
    })
    .then(res => {
      dispatch(createNight(res.data))
    })
    .catch(error =>
      dispatch(createNight({error})))
  }
}

export const retrieveNight = () => {
  return dispatch => {
    return axios.get('/api/night')
    .then(res => {
      return (!res.data.active)
      ? dispatch(getNight(defaultNight))
      : dispatch(getNight(res.data))
    })
    .catch(error =>
      dispatch(getNight({error})))
  }
}

export const endNight = (nightId) => {
  let night = {randomId: nightId}
  return dispatch => {
    axios.put('/api/night/end', night)
    .then(() => {
      dispatch(deactivateNight())
    })
    .catch(error =>
      dispatch(deactivateNight({error})))
  }
}

export default function (state = defaultNight, action) {
  switch (action.type) {
    case CREATE_NIGHT:
      return action.night
    case GET_NIGHT:
      return Object.assign({}, state, action.night)
    case DEACTIVATE_NIGHT:
      return Object.assign({}, state, {active: false})
    default:
      return state
  }
}
