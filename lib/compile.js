var EMPTY_OBJ = {}

// deeply convert an XML DOM to VDOM
module.exports = function toVdom (node, visitor, h, options) {
  walk.visitor = visitor
  walk.h = h
  walk.options = options || EMPTY_OBJ
  return walk(node)
}

function walk (n, index, arr) {
  const type = walk.type
  if (n.nodeType === 3) {
    var text = 'textContent' in n ? n.textContent : n.nodeValue || ''
    if (walk.options.trim !== false) {
      // trim strings but don't entirely collapse whitespace
      if (text.match(/^[\s\n]+$/g) && walk.options.trim !== 'all') {
        text = ' '
      } else {
        text = text.replace(/(^[\s\n]+|[\s\n]+$)/g, '')
      }
      // skip leading/trailing whitespace
      if (!text || text === ' ' && arr.length > 1 && (index === 0 || index === arr.length - 1)) return null
    }
    return text
  }
  if (n.nodeType !== 1) return null
  var nodeName = String(n.nodeName)
  nodeName = type === 'html' ? nodeName.toLowerCase() : nodeName

  // Do not allow script tags unless explicitly specified
  if (nodeName === 'script' && !walk.options.allowScripts) return null
  var out = walk.h(
    nodeName,
    getProps(n.attributes),
    walkChildren(n.childNodes)
  )

  return walk.visitor
    ? walk.visitor(out)
    : out
}

function getProps (attrs) {
  var len = attrs && attrs.length
  if (!len) return null
  var props = {}
  for (var i = 0; i < len; i++) {
    var name = attrs[i].name
    var value = attrs[i].value
    if (value === '') value = true
    if (name.substring(0, 2) === 'on' && walk.options.allowEvents) {
      value = new Function(value)
    }
    props[name] = value
  }
  return props
}

function walkChildren (children) {
  var c = children && Array.prototype.map.call(children, walk).filter(exists)
  return c && c.length ? c : null
}

function exists (x) { return x }
