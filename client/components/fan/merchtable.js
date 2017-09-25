import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {persistChoices, allowDownload, loadMusic} from '../../store'
import fanEmitter from '../../socket/fanEmitter'
import download from '../../../download'
import {checkAndUpdateDownloads} from '../../functions'

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
      <div>
        {(!this.props.fan.downloadAllowed || (!this.props.match.params.nightId && !this.props.match.params.fanId))
          ? <div>
              <form onSubmit={(event) => this.props.handleSubmit(event, this.props.persistChoices, this.props.fan.randomId, this.props.night.randomId)}>
                <input type="checkbox" name="songs" value="Song1" defaultChecked="true" />Song 1
                <input type="checkbox" name="songs" value="Song2" />Song 2
                <input type="checkbox" name="songs" value="Song3" defaultChecked="true" />Song 3
                <input type="checkbox" name="songs" value="Song4" />Song 4
                <button type="submit" to="#">request music</button>
              </form>
            </div>

          : <div><h2>~3-6 download limit lol</h2>
              {this.props.music.map((song, index) =>
                <div key={song}>{song}:&nbsp;
                  <Link to="#" onClick=
                    {() =>
                      this.props.handleClick(this.props.match.params.nightId, this.props.match.params.fanId, song)
                    }>
                    download
                  </Link>&nbsp;/&nbsp;
                  <Link to="#" onClick={() =>
                    window.open(`/api/music/${this.props.match.params.nightId}/${this.props.match.params.fanId}`)
                  }>
                    open
                  </Link>
                </div>
              )}
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
      let music = [...event.target.songs]
        .filter(song => song.checked)
        .map(song => song.value)
      func(fanId, nightId, music)
      fanEmitter.emit('musicChosen', fanId, nightId, music)
    },

    handleClick: (nightId, fanId, song) =>
      checkAndUpdateDownloads(fanId)
      .then(numDownloads =>
        (numDownloads < 7)
          && download(`/api/music/${nightId}/${fanId}`, song, 'audio/mpeg')
      )
  }
)

const mapDispatch = { persistChoices, allowDownload, loadMusic }

export default withRouter(connect(mapState, mapDispatch)(Merchtable))
