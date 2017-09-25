import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {persistChoices, allowDownload, loadMusic} from '../../store'
import fanEmitter from '../../socket/fanEmitter'
import {bookmarkMe} from '../../functions'

class Merchtable extends Component {

  componentDidMount() {
    fanEmitter.on('permissionGranted', (fanId) => { (this.props.fan.randomId == fanId) &&
      this.props.allowDownload(this.props.night.randomId, fanId)
    })
    this.props.match.params.fanId &&
      this.props.loadMusic(this.props.match.params.nightId, this.props.match.params.fanId)
      .then(res => !res.fan
        && window.location.replace(document.URL.replace(this.props.location.pathname, ''))
      )
  }

  render() {

    return (
      <div className="form-check align-center col-sm-12 col-md-12 col-lg-12">
        {(!this.props.fan.downloadAllowed || (!this.props.match.params.nightId && !this.props.match.params.fanId))
          ? <div className="form-check">
              <form onSubmit={(event) => this.props.handleSubmit(event, this.props.persistChoices, this.props.fan.randomId, this.props.night.randomId)}>
              <div className="form-check-label">
                <label className="form-check-label">
                &nbsp;<input type="checkbox" name="songs" value="Come%20Alive.mp3" defaultChecked="true" /> Come Alive</label><br />
                <label className="form-check-label">
                &nbsp;<input type="checkbox" name="songs" value="Monsters.mp3" /> Monsters</label><br />
                <label className="form-check-label">
                &nbsp;<input type="checkbox" name="songs" value="Lush.mp3" defaultChecked="true" /> Lush</label><br />
              </div>
              <div>
                <button id="requestMusic" type="submit" to="#">request music</button>
              </div>
              </form>
            </div>

          : <div className="align-center col-sm-12 col-md-12 col-lg-12">
            <table><tbody>
              {this.props.music.map((song, index) =>
                <tr key={song.mp3}>
                  <td className="align-right">{decodeURI(song.mp3).slice(0,-4)}:&nbsp;</td>
                  <td className="align-left">&nbsp;<Link to="#" onClick=
                    {() =>
                      this.props.handleClick(this.props.match.params.nightId, this.props.match.params.fanId, song)
                    }>
                    open/download
                  </Link></td>
                </tr>
              )}
              </tbody></table>
              <div>
                <Link to="#" onClick={() => window.open(`mailto:-->YOUR@EMAIL.COM?subject=downloads&body=${document.URL}`)}>email yourself this page</Link>
              </div>
              <div>
                <Link to="#" onClick={bookmarkMe}>bookmark this page
                </Link>
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapState = (state) => (
  {
    music: state.fan.music,

    handleSubmit: (event, func, fanId, nightId) => {
      event.preventDefault();
      $("#requestMusic").html("update choice");
      let music = [...event.target.songs]
        .filter(song => song.checked)
        .map(song =>
          ({mp3: song.value,
            downloads: 0})
        )
      func(fanId, nightId, music)
      fanEmitter.emit('musicChosen', fanId, nightId, music)
    },

    handleClick: (nightId, fanId, song) =>
      window.open(`/api/music/${nightId}/${fanId}/${song.mp3.slice(0,-4)}`)

  }
)

const mapDispatch = { persistChoices, allowDownload, loadMusic }

export default withRouter(connect(mapState, mapDispatch)(Merchtable))
