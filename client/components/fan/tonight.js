import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import history from '../../history'
import {loadDistance, loadId, retrieveNight} from '../../store'
import {Merchtable} from '../../components'

class Tonight extends Component {

  componentDidMount() {
    this.props.loadDistance()
    this.props.loadId()
    this.props.retrieveNight()
  }

  render() {
    return (
      <div>
        {
          (this.props.fan && this.props.fan.distance != -1) &&
            (this.props.fan.distance.value > 4828 + this.props.fan.distance.accuracy)
              ? history.push('/')
              : <Merchtable fanId={this.props.fan.randomId} nightId={this.props.night.randomId} />
        }
      </div>
    )
  }
}

const mapState = (state) => (
  {
    fan: state.fan,
    night: state.night
  }
)

const mapDispatch = { loadDistance, loadId, retrieveNight }

export default withRouter(connect(mapState, mapDispatch)(Tonight))
