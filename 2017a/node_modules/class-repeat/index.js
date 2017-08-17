'use strict'

var isPresent = require('is-present')
var hasClass = require('has-class-selector')
var SelectorTokenizer = require('css-selector-tokenizer')

module.exports = function classRepeat (selector, options) {
  if (typeof selector !== 'string') {
    throw new TypeError('class-repeat expects a string')
  }

  options = options || {}
  options.repeat = options.repeat || 2

  if (hasClass(selector)) {
    var tokens = SelectorTokenizer.parse(selector).nodes[0] || { nodes: [] }
    var tokensWithRepeatedClasses = []
    tokens.nodes.map(function (node, index) {
      if (node.type === 'class') {
        for (var i = 0; i < options.repeat; i++) {
          tokensWithRepeatedClasses.push(node)

          var nextToken = tokens.nodes[index + 1]
          if (isPresent(nextToken) && isPseudo(nextToken) && i + 1 !== options.repeat) {
            tokensWithRepeatedClasses.push(nextToken)
          }
        }
      } else {
        tokensWithRepeatedClasses.push(node)
      }
    })

    return SelectorTokenizer.stringify({
      type: 'selectors',
      nodes: [{
        type: 'selector',
        nodes: tokensWithRepeatedClasses
      }]
    })
  } else {
    return selector
  }
}

function isPseudo(token) {
  return token && (token.type === 'pseudo-element' || token.type === 'pseudo-class')
}
