
# preact-html

  Turn HTML strings into Preact VNodes. The functional version of [preact-markup](https://github.com/developit/preact-markup).

## Why

  This satisifies my use case of being able to modify vnodes before render. If you'd like to replace class names on the markup, you may want to try this library, otherwise I'd probably go with the better tested [preact-markup](https://github.com/developit/preact-markup).

## Usage

```js
const { CSS, HTML, render } = require('vcom')
const html = require('preact-html')

const css = CSS(`
  .blue {
    background: blue;
  }
`)

const vnodes = html('<h2 class="blue"><strong>hi there!</strong></h2>', {
  h2 (props) {
    return HTML.h3.class(props.class)(props.children)
  }
})

const div = css(HTML.div(vnodes))
render(div, document.body)
// <div><h3 class="_1nxhvta"><strong>hi there!</strong></h3></div>
```

## Credits

  [@developit](https://github.com/developit) wrote 99% of this.

## License

MIT
