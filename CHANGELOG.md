## CHANGELOG
### 0.3.0
Use `prop-types` library because `React.PropTypes` is deprecated as of React v15.5 [#2](https://github.com/souporserious/react-paper-ripple/pull/2)

Upgrade `react-motion` to `0.5.0`

Use `ref` instead of `findDOMNode`

Added `react-document-events` 🎉

***API changes***

Before:

```js
<PaperRipple tag="h1" color="#ffeee5">
  React Paper Ripple
</h1>
```

After:

```js
<h1>
  React Paper Ripple
  <PaperRipple color="#ffeee5"/>
</h1>
```

### 0.2.1
Add events to the main element so events don't get captured by the waves container

Removed unused code

### 0.2.0
Use `getBoundingClientRect` for offset calculation

Don't prevent default or stop propagation on event handlers

Class name changes:
- .react-ripple > .paper-ripple
- .react-wave > .paper-ripple-wave

Dropped bower support

### 0.1.1
Fix dist build to not include React DOM

### 0.1.0
Initial release
