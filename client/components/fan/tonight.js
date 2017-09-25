import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import history from '../../history'
import {loadDistance, loadId, retrieveNight} from '../../store'
import {Merchtable} from '../../components'

class Tonight extends Component {

  componentDidMount() {
    !this.props.match.params.fanId &&
      this.props.loadDistance()
      .then(res =>
        (res.distance.value == -1 || res.distance.value > 4828 + res.distance.accuracy)
          && window.location.replace(document.URL.replace(this.props.location.pathname, ''))
      )
    !this.props.match.params.fanId &&
      this.props.retrieveNight()
        .then(res =>
          (!res.night.active)
            && window.location.replace(document.URL.replace(this.props.location.pathname, ''))
        )
    !this.props.match.params.fanId &&
      this.props.loadId()
  }

  render() {

    return (
      <div className="row">
        <h1 className="align-center">Get That Music</h1>
        <Merchtable fan={this.props.fan || {randomId: this.props.match.params.fanId}} night={this.props.night || {randomId: this.props.match.params.nightId}} />
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
