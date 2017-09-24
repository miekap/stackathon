import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {generateNight, logout} from '../../store'

export const ArtistHome = (props) => {
  return (
    <div>
      <h1>ADMIN: Physical Digital Merch Table</h1>
      <h3>Welcome {props.email} <Link to='#' onClick={props.logout}>(Logout)</Link></h3>
      <p><Link to='#' onClick={props.generateNight}>Create night ID</Link></p>
      {
        props.night &&
          <p>randomId: {props.night.randomId}, lat: {props.night.lat}, lng: {props.night.lng}, accuracy: {props.night.accuracy}</p>
      }
    </div>
  )
}

const mapState = (state) => (
  {
    email: state.artist.email,
    night: state.night
  }
)

const mapDispatch = { logout, generateNight }

export default withRouter(connect(mapState, mapDispatch)(ArtistHome))

ArtistHome.propTypes = {
  email: PropTypes.string
}
