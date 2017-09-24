import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import history from '../../history'
import {loadDistance, loadId, retrieveNight} from '../../store'
import {Merchtable} from '../../components'

class Tonight extends Component {

  componentDidMount() {
    this.props.loadDistance()
    .then(res =>
      (res.distance.value == -1 || res.distance.value > 4828 + res.distance.accuracy)
        && window.location.replace(document.URL.replace(this.props.location.pathname, ''))
    )
    this.props.retrieveNight()
      .then(res =>
        (!res.night.active)
          && window.location.replace(document.URL.replace(this.props.location.pathname, ''))
      )
    this.props.loadId()
    }

  render() {

    return (
      <div>
        {
          this.props.fan &&
            <Merchtable fanId={this.props.fan.randomId} nightId={this.props.night.randomId} />
        }
      </div>
    )
  }
}

const mapState = (state) => (
  {

  }
)

const mapDispatch = { loadDistance, loadId, retrieveNight }

export default withRouter(connect(mapState, mapDispatch)(Tonight))
