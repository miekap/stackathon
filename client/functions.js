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
  .then(res => {
    return res
     ? getDistance(res.lat, res.lng, res.accuracy)
     : {value: -1, accuracy: -1}
  })
}

//https://stackoverflow.com/questions/10033215/how-do-i-add-an-add-to-favorites-button-or-link-on-my-website
export function bookmarkMe() {
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
      window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
      this.title = document.title;
      return true;
    } else { // webkit - safari/chrome
      alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
  }
