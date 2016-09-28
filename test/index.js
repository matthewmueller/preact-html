/**
 * Module Dependencies
 */

const string = require('preact-render-to-string')
const { CSS, HTML, render } = require('vcom')
const assert = require('assert')
const html = require('..')

/**
 * Browser
 */

const browser = typeof window !== 'undefined'

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
    const css = CSS(`
      .blue {
        background: blue;
      }
    `)

    let vnodes = html('<h2 class="blue"><strong>hi there!</strong></h2>', {
      h2 (props) {
        return HTML.h3.class(props.class)(props.children)
      }
    })
    let div = css(HTML.div(vnodes))
    assert.equal(r(div), '<div><h3 class="_1nxhvta"><strong>hi there!</strong></h3></div>')
  })

  it('should not trim by default', () => {
    const css = CSS(`
      .blue {
        background: blue;
      }
    `)

    let vnodes = html('<p>hi <strong>there</strong></p>')
    let div = css(HTML.div(vnodes))
    assert.equal(r(div), '<div><p>hi <strong>there</strong></p></div>')
  })

  it('should compile dynamic properties', () => {
    const css = CSS(`
      .blue {
        background: blue;
      }
    `)

    let vnodes = html('<h2><strong>hi there!</strong></h2>', {
      h2 (props) {
        return HTML.h3.class('blue')(props.children)
      }
    })
    let div = css(HTML.div(vnodes))
    assert.equal(r(div), '<div><h3 class="_1nxhvta"><strong>hi there!</strong></h3></div>')
  })
})

function r (vnode) {
  if (browser) {
    document.body.innerHTML = ''
    render(vnode, document.body)
    return document.body.innerHTML
  } else {
    return string(vnode)
  }
}
