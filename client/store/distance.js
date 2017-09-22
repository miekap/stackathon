import axios from 'axios'
import history from '../history'
import {getDistance} from '../functions'

const CREATE_DISTANCE = 'CREATE_DISTANCE'

const defaultDistance = 1000000

const createDistance = distance => ({type: CREATE_DISTANCE, distance})

export const checkDistance = (nightLat, nightLng) =>
  dispatch =>
    getDistance(nightLat, nightLng)
    .then(distance => dispatch(createDistance(distance)))
    .catch(error =>
      dispatch(createDistance({error})))

export default function (state = defaultDistance, action) {
  switch (action.type) {
    case CREATE_DISTANCE:
      return action.distance
    default:
      return state
  }
}
