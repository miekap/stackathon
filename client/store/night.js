import axios from 'axios'
import history from '../history'
import {getLocation, generateId} from '../functions'


const CREATE_NIGHT = 'CREATE_NIGHT'
const GET_NIGHT = 'GET_NIGHT'

const defaultNight = {}

const createNight = night => ({type: CREATE_NIGHT, night})
const getNight = night => ({type: GET_NIGHT, night})

export const generateNight = () =>
  dispatch =>
    getLocation()
    .then(res => res.data)
    .then(res => {
      return axios.post(`/api/night`, {
        randomId:  generateId(3),
        lat: res.location.lat,
        lng: res.location.lng,
        accuracy: res.accuracy
      })
    })
    .then(res => {
      dispatch(createNight(res.data))
      history.push(history.location)
    })
    .catch(error =>
      dispatch(createNight({error})))

export const retrieveNight = () =>
  dispatch =>
    axios.get('/api/night')
    .then(res => {
      dispatch(getNight(res.data))
      history.push(history.location)
    })
    .catch(error =>
      dispatch(getNight({error})))

export default function (state = defaultNight, action) {
  switch (action.type) {
    case CREATE_NIGHT:
      return action.night
    case GET_NIGHT:
      return action.night
    default:
      return state
  }
}
