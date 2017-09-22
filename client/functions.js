import axios from 'axios'
import {GOOGLE_GEOLOC_API_KEY} from './secrets'
import crypto from 'crypto'
import geolib from 'geolib'


export function getLocation() {
  return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOC_API_KEY}`, {})
}

export function randomId(num) {
  return crypto.randomBytes(num)
    .toString('base64')
    .slice(0, num)
    .replace(/\+/g, '0')
}

export function getDistance(nightLat, nightLng) {
  getLocation()
  .then(res => res.data)
  .then(res => {
    console.log(nightLat,nightLng,res.location.lat,res.location.lng)
    return geolib.getDistance(
      {latitude: nightLat, longitude: nightLng},
      {latitude: res.location.lat, longitude: res.location.lng}
    )
  })
}
