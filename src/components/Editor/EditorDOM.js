import ReactDOM from 'react-dom'
import { NODE_TYPES } from './Nodes'

class EditorDOM {
  static render(component) {
    const container = document.createElement('span')

    // container.className = 'NodeContainer'

    ReactDOM.render(component, container)

    return container
  }

  static domToString(nodes, startIndex) {
    let result = ''

    if (startIndex < 0 || startIndex >= nodes.length) {
      return result
    }

    const node = nodes[startIndex]


    if (node.nodeType === Node.TEXT_NODE) {
      result += node.length > 0 ? node.wholeText : ''
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      switch (parseInt(node.getAttribute('data-nodetype'), 10)) {
        case NODE_TYPES.emoji:
          result += node.getAttribute('alt')
          break
        case NODE_TYPES.variable:
          result += `{{${node.getAttribute('data-name')}`
          result += `${node.hasAttribute('data-value') ? `|${node.getAttribute('data-value')}` : ''}}}`
          break
        case NODE_TYPES.mention:
          result += node.innerText
          break
        default:
          result += `${node.tagName === 'DIV' ? '\n' : ''}${EditorDOM.domToString(node.childNodes, 0)}`
          break
      }
    }

    result += EditorDOM.domToString(nodes, startIndex + 1)

    return result
  }
}

export default EditorDOM