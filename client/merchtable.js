import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {generateFan} from './store'

export const FanDownload = (props) => {

  return (
    <div>
      {
        props.night && <Link to="#" onClick={() => props.generateFan(props.night.id)}>get that music</Link>
      }
    </div>
  )
}

const mapState = (state) => (
  {
    night: state.night,
    fan: state.fan
  }
)

const mapDispatch = { generateFan }

export default withRouter(connect(mapState, mapDispatch)(FanDownload))

FanDownload.propTypes = {
}
