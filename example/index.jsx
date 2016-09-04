import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import PaperRipple from '../src/react-paper-ripple'

import './main.scss'

class App extends Component {
  render() {
    return (
      <div>
        <PaperRipple tag="h1" color="#ffeee5">
          React Paper Ripple
        </PaperRipple>

        <h2>Buttons</h2>
        <section>
          <PaperRipple color="#fff" className="btn">
            Button
          </PaperRipple>
          <PaperRipple color="#f55c03" className="btn btn-link btn-red">
            Link
          </PaperRipple>
        </section>

        <h2>Circle Buttons</h2>
        <section>
          <PaperRipple color="#f55c03" center className="btn btn-circle btn-red">
            <i className="icon fa fa-bomb"/>
          </PaperRipple>
          <PaperRipple color="#03c8f5" center className="btn btn-circle btn-blue">
            <i className="icon fa fa-diamond"/>
          </PaperRipple>
          <PaperRipple color="#f55c03" center className="btn btn-circle btn-red">
            <i className="icon fa fa-hand-peace-o "/>
          </PaperRipple>
        </section>

        <h2>Menu</h2>
        <section>
          <div className="link-list">
            <PaperRipple color="#dde2e2" className="link">Menu Link</PaperRipple>
            <PaperRipple color="#dde2e2" className="link">Menu Link</PaperRipple>
            <PaperRipple color="#dde2e2" className="link">Menu Link</PaperRipple>
          </div>
        </section>

        <h2>Image</h2>
        <section>
          <PaperRipple color="#fff" style={{ position: 'relative' }}>
            <img src="https://unsplash.it/400/200"/>
          </PaperRipple>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
