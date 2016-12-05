/**
 * Module dependencies
 */

var render = require('./render')
var preact = require('preact')
var h = preact.h

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

function HTML (html, components, options) {
  components = components || {}
  options = options || {}
  if (options.trim === undefined) options.trim = false
  return render(
    html,
    options.type || 'html',
    options.reviver || h,
    components || {},
    options
  )
}
