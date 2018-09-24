const { splitIntoLines } = require('./labelUtils')
const REALLY_LARGE_SCREEN_WIDTH_CAUSING_NO_WRAPPING = 15000

class Title {
  constructor ({
    text = '',
    fontColor = '#333333',
    fontSize = 16,
    fontFamily = 'arial',
    topPadding = 10,
    bottomPadding = 10,
    innerPadding = 2
  }) {
    this.text = text
    this.font = {
      color: fontColor,
      size: parseFloat(fontSize),
      family: fontFamily
    }
    this.padding = {
      inner: parseFloat(innerPadding),
      top: parseFloat(topPadding),
      bottom: parseFloat(bottomPadding)
    }

    this.height = null
    this.x = 0
    this.y = this.padding.top
    this.maxWidth = REALLY_LARGE_SCREEN_WIDTH_CAUSING_NO_WRAPPING
  }

  setX (x) {
    this.x = parseFloat(x)
  }

  setY (y) {
    this.y = parseFloat(y)
  }

  setMaxWidth (maxWidth) {
    this.maxWidth = parseFloat(maxWidth)
  }

  getHeight () {
    return this.height
  }

  drawWith (plotId, svg) {
    svg.selectAll(`.plt-${plotId}-title`).remove()

    if (this.text !== '') {
      let lines = splitIntoLines(this.text, this.maxWidth, this.font.size, this.font.family)
      this.height =
        this.padding.top +
        this.font.size * lines.length + this.padding.inner * (lines.length - 1) +
        this.padding.bottom

      lines.forEach((text, lineIndex) => {
        svg.append('text')
          .attr('class', `plt-${plotId}-title`)
          .attr('x', this.x)
          .attr('y', this.y + (this.font.size + this.padding.inner) * lineIndex)
          .attr('fill', this.font.color)
          .attr('font-family', this.font.family)
          .attr('font-size', this.font.size)
          .attr('text-anchor', 'middle')
          .attr('font-weight', 'normal')
          .style('dominant-baseline', 'text-before-edge')
          .text(text)
      })
    } else {
      this.height = 0
    }
  }
}

module.exports = Title
