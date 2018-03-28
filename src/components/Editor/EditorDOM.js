import ReactDOM from 'react-dom'
import { NODE_TYPES } from './Nodes'

class EditorDOM {
  static deserializers = {
    [NODE_TYPES.emoji]: node => node.firstChild.getAttribute('alt'),
    [NODE_TYPES.variable]: (node) => {
      const content = node.firstChild
      let result = `{{${content.getAttribute('data-name')}`

      result += `${content.hasAttribute('data-value') ? `|${content.getAttribute('data-value')}` : ''}}}`

      return result
    },
    [NODE_TYPES.mention]: node => `<${node.firstChild.innerText}>`,
  }

  static findContainerNode(nodes) {
    let container = null

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.hasAttribute('data-nodetype')) {
          container = node
          break
        }

        if (node.parentNode.hasAttribute('data-nodetype')) {
          container = node.parentNode
          break
        }
      }
    }

    return container
  }

  static render(component, nodeType) {
    const container = document.createElement('span')

    container.setAttribute('data-nodetype', nodeType)

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
      if (node.hasAttribute('data-nodetype')) {
        result += EditorDOM.deserializers[parseInt(node.getAttribute('data-nodetype'), 10)](node)
      } else {
        result += `${node.tagName === 'DIV' ? '\n' : ''}${EditorDOM.domToString(node.childNodes, 0)}`
      }
    }

    result += EditorDOM.domToString(nodes, startIndex + 1)

    return result
  }
}

export default EditorDOM