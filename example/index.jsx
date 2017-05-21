import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import PaperRipple from '../src/react-paper-ripple'

import './main.scss'

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          React Paper Ripple
          <PaperRipple color="#ffeee5" />
        </h1>

        <h2>Buttons</h2>
        <section>
          <button color="#fff" className="btn">
            Button
            <PaperRipple color="#fff" />
          </button>
          <button className="btn btn-link btn-red">
            Link
            <PaperRipple color="#f55c03" />
          </button>
        </section>

        <h2>Circle Buttons</h2>
        <section>
          <button className="btn btn-circle btn-red">
            <i className="icon fa fa-bomb" />
            <PaperRipple color="#f55c03" center />
          </button>

          <button className="btn btn-circle btn-blue">
            <i className="icon fa fa-diamond" />
            <PaperRipple color="#03c8f5" center />
          </button>

          <button className="btn btn-circle btn-red">
            <i className="icon fa fa-hand-peace-o" />
            <PaperRipple color="#f55c03" center />
          </button>
        </section>

        <h2>Menu</h2>
        <section>
          <div className="link-list">
            <div className="link">
              Menu Link
              <PaperRipple color="#dde2e2" />
            </div>
            <div className="link">
              Menu Link
              <PaperRipple color="#dde2e2" />
            </div>
            <div className="link">
              Menu Link
              <PaperRipple color="#dde2e2" />
            </div>
          </div>
        </section>

        <h2>Image</h2>
        <section>
          <div
            color="#fff"
            style={{
              position: 'relative',
              WebkitUserSelect: 'none',
            }}
          >
            <img src="https://unsplash.it/400/200" />
            <PaperRipple color="#fff" />
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
