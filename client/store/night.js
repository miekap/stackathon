import axios from 'axios'
import history from '../history'
import crypto from 'crypto'

const CREATE_NIGHT = 'CREATE_NIGHT'
const GET_NIGHT = 'GET_NIGHT'
const REMOVE_NIGHT = 'REMOVE_NIGHT'

const defaultNight = {}

const createNight = night => ({type: CREATE_NIGHT, night})
const getNight = night => ({type: GET_NIGHT, night})
const removeNight = () => ({type: REMOVE_NIGHT})

export const generateNight = () =>
  dispatch =>
    axios.post(`/api/night/generate`, {
      eventId: crypto.randomBytes(4)
        .toString('base64')
        .slice(0, 4)
        .replace(/\+/g, '0')
    })
      .then(res => {
        dispatch(createNight(res.data))
        history.push('/night')
      })
      .catch(error =>
        dispatch(createNight({error})))

export default function (state = defaultNight, action) {
  switch (action.type) {
    case CREATE_NIGHT:
      return action.night
    case GET_NIGHT:
      return action.night
    case REMOVE_NIGHT:
      return defaultNight
    default:
      return state
  }
}
