import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {generateNight} from '../store'

export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome {email}</h3>
      <p><Link to='#' onClick={props.generateNight}>Create night ID</Link></p>
      {
        props.nightId &&
          <p>{props.nightId}</p>
      }
    </div>
  )
}

const mapState = (state) => (
  {
    email: state.user.email,
    nightId: state.night.eventId
  }
)

const mapDispatch = { generateNight }

export default withRouter(connect(mapState, mapDispatch)(UserHome))

UserHome.propTypes = {
  email: PropTypes.string
}
