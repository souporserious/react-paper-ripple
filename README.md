## React Paper Ripple

[![npm version](https://badge.fury.io/js/react-paper-ripple.svg)](https://badge.fury.io/js/react-paper-ripple)
[![Dependency Status](https://david-dm.org/souporserious/react-paper-ripple.svg)](https://david-dm.org/souporserious/react-paper-ripple)

Paper ripple animations inspired by Google Material Design.

## Install

`npm install react-paper-ripple --save`

```html
<script src="https://unpkg.com/react-paper-ripple/dist/react-paper-ripple.js"></script>
(UMD library exposed as `ReactPaperRipple`)
```

### Example

[Codepen Demo](http://codepen.io/souporserious/pen/ALBYdJ)

```js
import PaperRipple from 'react-paper-ripple'

class App extends Component {
  render() {
    return (
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
    )
  }
}
```

## Props

#### `tag`: PropTypes.string

The wrapping element around your element. Defaults to `div`. Any other valid props like `className` will be passed to this element.

#### `color`: PropTypes.string

The color of the wave. Passed as `backgroundColor` to private `Wave` component.

#### `opacity`: PropTypes.number

The opacity of the waves container.

#### `growRatio`: PropTypes.number

The amount the wave should grow compared to the biggest axis of the element.

#### `center`: PropTypes.number

Position the wave in the center of the element.

#### `rmConfig`: React.PropTypes.objectOf(React.PropTypes.number)

Pass in any valid [React Motion config object](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig).

## Running Locally

clone repo

`git clone git@github.com:souporserious/react-paper-ripple.git`

move into folder

`cd ~/react-paper-ripple`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`
