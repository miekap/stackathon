import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
import {me} from './store'
import {Admin, Login, Tonight} from './components'


class Routes extends Component {

  componentDidMount () {
    this.props.me()
  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/admin' component=
            {
              this.props.isLoggedIn
                ? Admin
                : Login
            } />
          <Route exact path='/tonight' component={Tonight} />
          <Route path='/tonight/:night/:fan' component={Tonight} />
        </Switch>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.artist.id
  }
}

const mapDispatch = { me }

export default connect(mapState, mapDispatch)(Routes)
