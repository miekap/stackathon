import axios from 'axios'
import history from '../history'
import {tonightsDistance, generateId} from '../functions'

const defaultFan = {
  distance: -1,
  randomId: ''
}

const GET_DISTANCE = 'GET_DISTANCE'
const ASSIGN_ID = 'ASSIGN_ID'

const getDistance = distance => ({type: GET_DISTANCE, distance})
const assignId = randomId => ({type: ASSIGN_ID, randomId})

export const loadDistance = () => {
  return dispatch => {
    tonightsDistance()
    .then(distance => {
      dispatch(getDistance(distance))
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

export default function (state = defaultFan, action) {
  switch (action.type) {
    case GET_DISTANCE:
      return Object.assign({}, state, {distance: action.distance})
    case ASSIGN_ID:
      return Object.assign({}, state, {randomId: action.randomId})
    default:
      return state
  }
}
