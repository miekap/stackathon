import axios from 'axios'
import history from '../history'
import {tonightsDistance, generateId} from '../functions'

const defaultFan = {
  distance: {value: -1, accuracy: -1},
  randomId: '',
  music: [],
  downloadAllowed: false
}

const GET_DISTANCE = 'GET_DISTANCE'
const ASSIGN_ID = 'ASSIGN_ID'
const CHOOSE_MUSIC = 'CHOOSE_MUSIC'
const CAN_DOWNLOAD = 'CAN_DOWNLOAD'

const getDistance = distance => ({type: GET_DISTANCE, distance})
const assignId = randomId => ({type: ASSIGN_ID, randomId})
const chooseMusic = music => ({type: CHOOSE_MUSIC, music})
const canDownload = () => ({type: CAN_DOWNLOAD})

export const loadDistance = () => {
  return dispatch => {
    return tonightsDistance()
    .then(distance => {
      return dispatch(getDistance(distance))
      history.push(history.location)
    })
    .catch(error =>
      dispatch(getDistance({error})))
  }
}

export const loadId = () => {
  return dispatch => {
    dispatch(assignId(generateId(4)))
    history.push(history.location)
  }
}

export const persistChoices = (fanId, nightId, music) => {
  return dispatch => {
    axios.post('/api/fan', {
      randomId: fanId,
      nightId,
      music
    })
    dispatch(chooseMusic(music))
  }
}

export const allowDownload = (fanId) => {
  return dispatch => {
    dispatch(canDownload())
  }
}

export default function (state = defaultFan, action) {
  switch (action.type) {
    case GET_DISTANCE:
      return Object.assign({}, state, {distance: action.distance})
    case ASSIGN_ID:
      return Object.assign({}, state, {randomId: action.randomId})
    case CHOOSE_MUSIC:
      return Object.assign({}, state, {music: action.music})
    case CAN_DOWNLOAD:
      return Object.assign({}, state, {downloadAllowed: true})
    default:
      return state
  }
}
