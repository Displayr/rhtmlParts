let idSeed = 0
function _getUniqueId () {
  return `wraptext-${++idSeed}`
}

function getLabelDimensionsUsingDivApproximation (inputString, fontSize = 12, fontFamily = 'sans-serif') {
  const uniqueId = _getUniqueId()

  const el = document.createElement('div')
  const domString = `<div id="${uniqueId}" style="display:inline-block; font-size: ${fontSize}px; font-family: ${fontFamily}">${inputString}</div>`
  el.innerHTML = domString
  document.body.appendChild(el.firstChild)
  const testElement = document.getElementById(uniqueId)
  const { width, height } = testElement.getBoundingClientRect()
  testElement.remove()
  return { width, height }
}

function wordTokenizer (inputString) {
  const inputString2 = inputString.replace(/<br>/g, ' <br> ')
  return inputString2.split(' ').map(token => token.trim()).filter(token => token.length > 0)
}

function splitIntoLines (inputString, maxWidth, fontSize = 12, fontFamily = 'sans-serif') {
  let tokens = wordTokenizer(inputString)
  let currentLine = []
  let lines = []
  let token

  while (token = tokens.shift()) { // eslint-disable-line no-cond-assign
    if (token === '<br>') {
      lines.push(`${currentLine.join(' ')}`)
      currentLine = []
      continue
    }

    currentLine.push(token)

    const { width } = getLabelDimensionsUsingDivApproximation(currentLine.join(' '), fontSize, fontFamily)
    if (width >= maxWidth && currentLine.length > 1) {
      tokens.unshift(currentLine.pop())
      lines.push(`${currentLine.join(' ')}`)
      currentLine = []
    }
  }

  if (currentLine.length > 0) {
    lines.push(`${currentLine.join(' ')}`)
  }

  return lines
}

module.exports = {
  getLabelDimensionsUsingDivApproximation,
  splitIntoLines
}
