import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentEvents from 'react-document-events'
import { TransitionMotion, spring, presets } from 'react-motion'

const eventTypes = {
  mousedown: 'MouseDown',
  touchstart: 'touchStart',
}

const waveContainerStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'hidden',
}

function preventDefault(e) {
  e.preventDefault()
}

function Wave({ data, style: { scale, opacity } }) {
  return (
    <div
      className="paper-ripple-wave"
      style={{
        ...data,
        WebkitTransform: `scale(${scale}, ${scale})`,
        transform: `scale3d(${scale}, ${scale}, 1)`,
        opacity,
      }}
    />
  )
}

class PaperRipple extends Component {
  static propTypes = {
    center: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    growRatio: PropTypes.number,
    rmConfig: PropTypes.objectOf(PropTypes.number),
  }

  static defaultProps = {
    center: false,
    color: '#fff',
    opacity: 0.25,
    growRatio: 2.25,
    rmConfig: { stiffness: 100, damping: 20 },
  }

  state = {
    waves: [],
  }

  _willEnter() {
    return {
      scale: 0,
      opacity: 1,
    }
  }

  _willLeave = () => {
    const { rmConfig } = this.props
    return {
      scale: spring(1, rmConfig),
      opacity: spring(0, rmConfig),
    }
  }

  _addWave = e => {
    if (this._waveAdded) return

    const { growRatio, center, color, rmConfig } = this.props
    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    const key = Date.now().toString()
    const waves = [...this.state.waves]
    const rect = this._parentNode.getBoundingClientRect()
    const offsetTop = rect.top + (window ? window.pageYOffset : 0)
    const offsetLeft = rect.left + (window ? window.pageXOffset : 0)
    const size = Math.max(rect.width, rect.height) * growRatio
    const halfSize = size / 2
    const data = {
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '100%',
      position: 'absolute',
      pointerEvents: 'none',
    }

    this._waveAdded = true
    this._currentKey = key

    if (center) {
      data.top = rect.height / 2
      data.left = rect.width / 2
      data.marginTop = -halfSize
      data.marginLeft = -halfSize
    } else {
      data.top = pageY - offsetTop - halfSize
      data.left = pageX - offsetLeft - halfSize
    }

    waves.push({
      key,
      data,
      style: {
        scale: spring(1, rmConfig),
        opacity: spring(1, rmConfig),
      },
    })

    this.setState({ waves })
  }

  _removeWave = () => {
    if (this._waveAdded) {
      this.setState({
        waves: this.state.waves.filter(wave => wave.key !== this._currentKey),
      })
      this._waveAdded = false
    }
  }

  _handleEvent = e => {
    const eventType = eventTypes[e.type]
    const propEvent = this.props[`on${eventType}`]

    this._addWave(e)

    if (typeof propEvent === 'function') {
      propEvent(e)
    }
  }

  _handleRef = node => {
    this._parentNode = node.parentNode
  }

  render() {
    const {
      center,
      color,
      growRatio,
      opacity,
      rmConfig,
      ...restProps
    } = this.props

    return (
      <TransitionMotion
        styles={this.state.waves}
        willEnter={this._willEnter}
        willLeave={this._willLeave}
      >
        {interpolatedWaves => (
          <div
            ref={this._handleRef}
            className="paper-ripple"
            style={{ ...waveContainerStyles, opacity }}
            onMouseDown={this._handleEvent}
            onTouchStart={this._handleEvent}
            {...restProps}
          >
            {interpolatedWaves.map(config => <Wave {...config} />)}
            <DocumentEvents
              onMouseup={this._removeWave}
              onTouchEnd={this._removeWave}
              onTouchCancel={this._removeWave}
            />
          </div>
        )}
      </TransitionMotion>
    )
  }
}

export default PaperRipple
