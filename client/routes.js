import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Login, Signup, ArtistHome, FanDownload} from './components'
import WebsitePlaceholder from './website-placeholder'
import Merchtable from './merchtable'
import {retrieveNight, checkDistance, me} from './store'
import {getLocation, randomId, getDistance} from './functions'


class Routes extends Component {

  componentDidMount () {
    this.props.me()
    this.props.retrieveNight()
  }

  render () {
this.props.distance && console.log(this.props.distance)
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/admin' component=
            {
              this.props.isLoggedIn
                ? ArtistHome
                : Login
            } />
          {
            this.props.night &&
              ((getDistance(this.props.night.lat, this.props.night.lng) < 2000000) &&
                <Route exact path='/tonight' component={Merchtable} />)
          }
          <Route path='/:night/:fan' component={FanDownload} />
          <Route component={WebsitePlaceholder} />
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.artist.id,
    night: state.night
  }
}

const mapDispatch = { me, retrieveNight, checkDistance }

export default connect(mapState, mapDispatch)(Routes)
