import axios from 'axios'
import {GOOGLE_GEOLOC_API_KEY} from './secrets'
import crypto from 'crypto'
import geolib from 'geolib'


export function generateId(num) {
  return crypto.randomBytes(num)
    .toString('base64')
    .slice(0, num)
    .replace(/\//g, '0')
}

export function getLocation() {
  return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOC_API_KEY}`, {})
}

export function getDistance(nightLat, nightLng, nightAccuracy) {
  return getLocation()
  .then(res => res.data)
  .then(res => {
    return {
      value: geolib.getDistance(
        {latitude: nightLat, longitude: nightLng},
        {latitude: res.location.lat, longitude: res.location.lng}
      ),
      accuracy: +res.accuracy + +nightAccuracy
    }
  })
}

export function tonightsDistance() {
  return axios.get('/api/night')
  .then(res => res.data)
  .then(res => getDistance(res.lat, res.lng, res.accuracy))
}
