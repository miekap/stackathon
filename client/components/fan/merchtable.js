import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {persistChoices} from '../../store'
import fanEmitter from '../../socket/fanEmitter'

class Merchtable extends Component {

  componentDidMount() {
    fanEmitter.on('permissionGranted', (f, n, m) => {
      this.props.addOrUpdateCustomer(this.props.customers, f, n, m)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.props.handleSubmit(event, this.props.persistChoices, this.props.fanId, this.props.nightId)}>
          <input type="checkbox" name="songs" value="Song1" defaultChecked="true" />Song 1
          <input type="checkbox" name="songs" value="Song2" />Song 2
          <input type="checkbox" name="songs" value="Song3" defaultChecked="true" />Song 3
          <input type="checkbox" name="songs" value="Song4" />Song 4
          <button type="submit" to="#">request music</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => (
  {
    music: state.fan.music,
    handleSubmit: (event, func, fanId, nightId) => {
      event.preventDefault();
      let music = [...event.target.songs]
        .filter(song => song.checked)
        .map(song => song.value)
      func(fanId, nightId, music)
      fanEmitter.emit('musicChosen', fanId, nightId, music)
    }

  }
)

const mapDispatch = {persistChoices}

export default withRouter(connect(mapState, mapDispatch)(Merchtable))
