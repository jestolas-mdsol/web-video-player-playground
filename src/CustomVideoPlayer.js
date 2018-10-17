import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './App.css';
import mountainViewVideo from './videos/mountainView.mp4';

class CustomVideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      timeElapsed: 0,
      timeRemaining: 10,
      videoDuration: 0,
      timeElapsedMinutes: 0,
      timeElapsedSeconds: 0,
      videoDurationSeconds: 0,
      videoDurationMinutes: 0,
      embeddedVideoPlayer: null,
      currentProgressWidth: 0,
      playerWrapper: null,
      inFullScreen: false,
    }
  }

  componentDidMount() {
    this.initializeVideoPlayerInState();
  }

  initializeVideoPlayerInState = () => {
    this.setState({
      embeddedVideoPlayer: document.getElementById('embeddedVideoPlayer'),
      playerWrapper: document.getElementById('playerWrapper'),
    })
  }

  handlePlay = (e) => {
    this.setState({
      videoDuration: e.target.duration,
      videoDurationMinutes: Math.floor(e.target.duration / 60),
      videoDurationSeconds: Math.floor(e.target.duration) % 60,
    })
  }

  handleTimeUpdate = (e) => {
    const maxProgressBar = document.getElementById('controlsMaxProgressBar');

    this.setState({
      timeElapsed: e.target.currentTime,
      timeRemaining: e.target.duration - e.target.currentTime,
      timeElapsedMinutes: Math.floor(e.target.currentTime / 60),
      timeElapsedSeconds: Math.floor(e.target.currentTime) % 60,
      currentProgressWidth: (maxProgressBar.offsetWidth/this.state.videoDuration) * e.target.currentTime,
    });
  }

  handleProgressBarClick = (e) => {
    const embeddedVideoPlayer = document.getElementById('embeddedVideoPlayer');
    const maxProgressBar = document.getElementById('controlsMaxProgressBar');
    const cursorX = e.pageX - e.target.offsetLeft
    const newCurrentTime = (cursorX / maxProgressBar.offsetWidth) * this.state.videoDuration;
    embeddedVideoPlayer.currentTime = newCurrentTime;

    if (embeddedVideoPlayer.paused) {
      embeddedVideoPlayer.play();
    }
  }

  toggleFullScreen = () => {
    if (document.webkitIsFullScreen) {
      this.setState({ inFullScreen: false });
      document.webkitExitFullscreen();
    } else {
      this.setState({ inFullScreen: true });
      this.state.playerWrapper.webkitRequestFullScreen();
    }
  }

  togglePlayPause = () => {
    const { embeddedVideoPlayer } = this.state;

    embeddedVideoPlayer.paused ? embeddedVideoPlayer.play() : embeddedVideoPlayer.pause();
  }

  render() {
    const isPaused = this.state.embeddedVideoPlayer && this.state.embeddedVideoPlayer.paused;

    return (
      <div>
        <h2>Video With Custom Controls</h2>
        <div
          id="playerWrapper"
          playsInline
          preload="true"
        >
          <video
            id="embeddedVideoPlayer"
            preload="true"
            src={mountainViewVideo}
            onClick={this.togglePlayPause}
            onTimeUpdate={this.handleTimeUpdate}
            onPlay={this.handlePlay}
            onCanPlay={this.handlePlay}
            playsInline
            tabIndex={-1}
          />
          <div className="controlsWrapper">
            <div onClick={this.handleProgressBarClick}>
              <div id="controlsMaxProgressBar" className="controlsMaxProgressBar" />
              <div style={{ width: this.state.currentProgressWidth }} className="controlsCurrentProgressBar" />
            </div>
            <div className="playerButtonsAndTime">
              <div className="playPauseButton" onClick={this.togglePlayPause}>
                <div className={`${isPaused ? 'playSymbol' : 'pauseSymbol'}`}></div>
              </div>
              <p id="controlsTimeDisplay" className="controlsTimeDisplay">
                {this.state.timeElapsedMinutes}:{this.state.timeElapsedSeconds}/{this.state.videoDurationMinutes}:{this.state.videoDurationSeconds}
              </p>
              <div className="toggleFullscreen" onClick={this.toggleFullScreen}>
                {
                  this.state.inFullScreen ?
                    <Glyphicon className="mazResizeIcon" glyph="glyphicon glyphicon-resize-small" /> :
                    <Glyphicon className="mazResizeIcon" glyph="glyphicon glyphicon-fullscreen" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomVideoPlayer;
