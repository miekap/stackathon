import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

export const Merchtable = (props) => {

  return (
    <div>
      <form>
        <input type="checkbox" name="music" value="Song1" defaultChecked="true" />Song 1
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

const mapState = (state) => ({})

const mapDispatch = {}

export default withRouter(connect(mapState, mapDispatch)(Merchtable))
