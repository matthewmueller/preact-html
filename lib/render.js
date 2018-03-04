var parseMarkup = require('./parse')
var toVdom = require('./compile')

var EMPTY_OBJ = {}

/** Convert markup into a virtual DOM.
* @param {String} markup    HTML or XML markup (indicate via `type`)
* @param {String} [type=xml]  A type to use when parsing `markup`. Either `xml` or `html`.
* @param {Function} reviver The JSX/hyperscript reviver (`h` function) to use. For example, Preact's `h` or `ReactDOM.createElement`.
* @param {Object} [map]   Optional map of custom element names to Components or variant element names.
 */
module.exports = function markupToVdom (markup, type, reviver, map, options) {
  var dom = parseMarkup(markup, type)
  if (dom && dom.error) {
    throw new Error(dom.error)
  }

  var body = dom && dom.body || dom
  visitor.type = type
  visitor.map = map || EMPTY_OBJ
  var vdom = body && toVdom(body, visitor, reviver, options)
  visitor.map = null

  return vdom && vdom.children || null
}

function visitor (node) {
  var name = node.nodeName
  var map = visitor.map
  var type = visitor.type

  name = type === 'html' ? name.toLowerCase() : name
  if (map && map.hasOwnProperty(name)) {
    var props = {}
    for (var k in node.attributes) {
      if (!node.attributes.hasOwnProperty(k)) continue
      props[k] = node.attributes[k]
    }
    props.key = node.key
    props.children = node.children

    var newNode = map[name](props)
    if (!newNode) return null
    node.nodeName = newNode.nodeName
    node.attributes = newNode.attributes
    node.children = newNode.children
    node.key = newNode.key
  } else {
    node.nodeName = name.replace(/[^a-z0-9-]/i, '')
  }

  return node
}
