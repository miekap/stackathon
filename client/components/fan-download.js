import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {retrieveNight} from '../store'

export const FanDownload = (props) => {
  props.retrieveNight()
  props.night && console.log(props.night)

  return (
    <div>
      <Link to="/:night/:fan">get that music</Link>
    </div>
  )
}

const mapState = (state) => (
  {
    night: state.night
  }
)

const mapDispatch = { retrieveNight }

export default withRouter(connect(mapState, mapDispatch)(FanDownload))

FanDownload.propTypes = {
}
