import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {retrieveNight, loadCustomers, addOrUpdateCustomer, generateNight, logout} from '../../store'
import artistEmitter from '../../socket/artistEmitter'


class Admin extends Component {

  componentDidMount() {
    this.props.retrieveNight()
    this.props.loadCustomers()
    artistEmitter.on('heresFanChoices', (f, n, m) => {
      this.props.addOrUpdateCustomer(this.props.customers, f, n, m)
    })
  }

  render() {
    return (
      <div>
        <h1>ADMIN: Physical Digital Merch Table</h1>
        <h3>Welcome {this.props.email} <Link to='#' onClick={this.props.logout}>(Logout)</Link></h3>

        <p><Link to='#' onClick={this.props.generateNight}>Create night ID</Link></p>
        {
          this.props.night &&
            <p>randomId: {this.props.night.randomId}, lat: {this.props.night.lat}, lng: {this.props.night.lng}, accuracy: {this.props.night.accuracy}</p>
        }
      </div>
    )
  }
}

const mapState = (state) => (
  {
    email: state.artist.email,
    night: state.night,
    customers: state.customers
  }
)

const mapDispatch = { retrieveNight, loadCustomers, addOrUpdateCustomer, logout, generateNight }

export default withRouter(connect(mapState, mapDispatch)(Admin))
