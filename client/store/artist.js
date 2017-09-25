import axios from 'axios'
import history from '../history'

const defaultArtist = {}

const GET_ARTIST = 'GET_ARTIST'
const REMOVE_ARTIST = 'REMOVE_ARTIST'

const getArtist = artist => ({type: GET_ARTIST, artist})
const removeArtist = () => ({type: REMOVE_ARTIST})

export const me = () => {
  return dispatch => {
    axios.get('/auth/me')
      .then(res =>
        dispatch(getArtist(res.data || defaultArtist)))
      .catch(err => console.log(err))
  }
}

export const auth = (email, password, method) => {
  return dispatch => {
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getArtist(res.data))
        history.push('/admin')
      })
      .catch(error =>
        dispatch(getArtist({error})))
  }
}

export const logout = () => {
  return dispatch => {
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeArtist())
        history.push('/admin')
      })
      .catch(err => console.log(err))
  }
}

export default function (state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTIST:
      return action.artist
    case REMOVE_ARTIST:
      return defaultArtist
    default:
      return state
  }
}
