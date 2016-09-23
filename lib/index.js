/**
 * Module dependencies
 */

let render = require('./render')
let { h } = require('preact')

/**
 * Export `HTML`
 */

module.exports = HTML

/**
 * Initialize `HTML`
 *
 * @param {Object} props
 * @return {VNode}
 */

function HTML (html, components = {}, options = {}) {
  if (options.trim === undefined) options.trim = false
  return render(
    html,
    options.type || 'html',
    options.reviver || h,
    components || {},
    options
  )
}
