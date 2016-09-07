import React, { Component, PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { TransitionMotion, spring, presets } from 'react-motion'
import getPublicProps from './get-public-props'

const Wave = ({ data, style: { scale, opacity } }) => (
  <div
    className="react-wave"
    style={{
      ...data,
      WebkitTransform: `scale(${scale}, ${scale})`,
      transform: `scale3d(${scale}, ${scale}, 1)`,
      opacity
    }}
  />
)

class PaperRipple extends Component {
  static propTypes = {
    tag: PropTypes.string,
    center: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    growRatio: PropTypes.number,
    rmConfig: React.PropTypes.objectOf(React.PropTypes.number)
  }

  static defaultProps = {
    tag: 'div',
    center: false,
    color: '#03c8f5',
    opacity: 0.25,
    growRatio: 2.25,
    rmConfig: { stiffness: 18, damping: 6 }
  }

  state = {
    waves: []
  }

  componentDidMount() {
    this._node = findDOMNode(this)

    document.addEventListener('mouseup', this._removeWave)
    document.addEventListener('touchend', this._removeWave)
    document.addEventListener('touchcancel', this._removeWave)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this._removeWave)
    document.removeEventListener('touchend', this._removeWave)
    document.removeEventListener('touchcancel', this._removeWave)
  }

  _willEnter() {
    return {
      scale: 0,
      opacity: 1
    }
  }

  _willLeave = () => {
    const { rmConfig } = this.props
    return {
      scale: spring(1, rmConfig),
      opacity: spring(0, rmConfig)
    }
  }

  _addWave = (e) => {
    // bail out if a wave was already added
    if (this._waveAdded) return;

    e.stopPropagation();
    e.preventDefault();

    const { growRatio, center, color, rmConfig } = this.props
    const { pageX, pageY } = e.touches && e.touches[0] || e
    const key = Date.now().toString()
    const waves = [...this.state.waves]
    const rect = this._node.getBoundingClientRect()
	  const offsetTop = rect.top + window.pageYOffset
	  const offsetLeft = rect.left + window.pageXOffset
    const size = Math.max(rect.width, rect.height) * growRatio
    const halfSize = (size / 2)
    const data = {
      width: size,
      height: size,
      background: color,
      borderRadius: '100%',
      position: 'absolute'
    }

    this._waveAdded = true
    this._currentKey = key

    if (center) {
			data.top = rect.height / 2
      data.left = rect.width / 2
      data.marginTop = -halfSize
      data.marginLeft = -halfSize
    } else {
      data.top = (pageY - offsetTop) - halfSize
      data.left = (pageX - offsetLeft) - halfSize
    }

    waves.push({
      key,
      data,
      style: {
        scale: spring(1, rmConfig),
        opacity: spring(1, rmConfig)
      }
    })

    this.setState({ waves })
  }

  _removeWave = () => {
    if (this._waveAdded) {
      this.setState({
        waves: this.state.waves.filter(wave =>
          wave.key !== this._currentKey
        )
      })
      this._waveAdded = false
    }
  }

  render() {
    const { tag, center, color, growRatio, opacity, rmConfig, children, ...restProps } = this.props
    return (
      <this.props.tag {...restProps}>
        {children}
        <TransitionMotion
          styles={this.state.waves}
          willEnter={this._willEnter}
          willLeave={this._willLeave}
        >
          {(interpolatedWaves) =>
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflow: 'hidden',
                opacity
              }}
              className="react-ripple"
              onMouseDown={this._addWave}
              onTouchStart={this._addWave}
            >
              {interpolatedWaves.map(config =>
                <Wave {...config}/>
              )}
            </div>
          }
        </TransitionMotion>
      </this.props.tag>
    )
  }
}

export default PaperRipple
