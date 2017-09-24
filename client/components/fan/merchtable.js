import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {createFan} from '../../store'

const Merchtable = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    let music = [...event.target.songs]
      .filter(song => song.checked)
      .map(song => song.value)
      console.log(props.createFan)
    props.createFan(props.fanId, props.nightId, music)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="songs" value="Song1" defaultChecked="true" />Song 1
        <input type="checkbox" name="songs" value="Song2" />Song 2
        <input type="checkbox" name="songs" value="Song3" defaultChecked="true" />Song 3
        <input type="checkbox" name="songs" value="Song4" />Song 4
        <button type="submit" to="#">request music</button>
      </form>
    </div>
  )
}

const mapState = (state) => (
  {
    music: state.fan.music
  }
)

const mapDispatch = {createFan}

export default withRouter(connect(mapState, mapDispatch)(Merchtable))
