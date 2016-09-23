/**
 * Module Dependencies
 */

const { CSS, HTML, render } = require('vcom')
const assert = require('assert')
const html = require('..')

const css = CSS(`
  .blue {
    background: blue;
  }
`)

/**
 * Tests
 */

describe('html', () => {
  it('should compile html to vnodes', () => {
    let vnodes = html('<h2 class="blue"><strong>hi there!</strong></h2>')
    let div = HTML.div(vnodes)
    assert.equal(r(div), '<div><h2 class="blue"><strong>hi there!</strong></h2></div>')
  })

  it('should support component mapping', () => {
    let vnodes = html('<h2 class="blue"><strong>hi there!</strong></h2>', {
      h2 (props) {
        return HTML.h3.class(props.class)(props.children)
      }
    })
    let div = css(HTML.div(vnodes))
    assert.equal(r(div), '<div><h3 class="_1nxhvta"><strong>hi there!</strong></h3></div>')
  })

  it('should not trim by default', async () => {
    let vnodes = html('<p>hi <strong>there</strong></p>')
    let div = css(HTML.div(vnodes))
    assert.equal(r(div), '<div><p>hi <strong>there</strong></p></div>')
  })
})

function r (vnode) {
  document.body.innerHTML = ''
  render(vnode, document.body)
  return document.body.innerHTML
}
