// @flow weak

import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { Handle, Track, Tick } from './components' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 8,
  borderRadius: 4,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)',
}

const defaultValues = [450, 400, 300, 150]

class Example extends Component {
  state = {
    domain: [100, 500],
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  setDomain = domain => {
    this.setState({ domain })
  }

  render() {
    const { state: { domain, values, update } } = this

    return (
      <div style={{ height: 120, width: '100%' }}>
        <button onClick={() => this.setDomain([0, 500])}>
          SET DOMAIN [0, 500]
        </button>
        <button onClick={() => this.setDomain([100, 500])}>
          SET DOMAIN [100, 500]
        </button>
        <ValueViewer values={values} update={update} />
        <Slider
          mode={2}
          step={10}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          defaultValues={values}
        >
          <Rail>
            {({ emitMouse, emitTouch }) => (
              <div
                style={railStyle}
                onMouseDown={e => emitMouse(e)}
                onTouchStart={e => emitTouch(e)}
              />
            )}
          </Rail>
          <Handles>
            {({ handles, emitMouse, emitTouch }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, emitMouse, emitTouch }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    emitMouse={emitMouse}
                    emitTouch={emitTouch}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={15}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default Example