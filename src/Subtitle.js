const { splitIntoLines } = require('./labelUtils')
const REALLY_LARGE_SCREEN_WIDTH_CAUSING_NO_WRAPPING = 15000

class Subtitle {
  constructor ({
    subtitleText = '',
    subtitleFontColor = '#444444',
    subtitleFontSize = 12,
    subtitleFontFamily = 'arial',
    yOffset = 0,
    bottomPadding = 10,
    innerPadding = 2
  }) {
    this.text = subtitleText
    this.font = {
      color: subtitleFontColor,
      size: parseFloat(subtitleFontSize),
      family: subtitleFontFamily
    }
    this.padding = {
      top: 0, // NB specified for symetry with Title code, but not user configurable
      inner: parseFloat(innerPadding),
      bottom: parseFloat(bottomPadding)
    }

    this.height = null
    this.x = 0
    this.y = parseFloat(yOffset)
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
    svg.selectAll(`.plt-${plotId}-subtitle`).remove()

    if (this.text !== '') {
      let lines = splitIntoLines(this.text, this.maxWidth, this.font.size, this.font.family)
      this.height =
        this.padding.top +
        this.font.size * lines.length + this.padding.inner * (lines.length - 1) +
        this.padding.bottom

      lines.forEach((text, lineIndex) => {
        svg.append('text')
          .attr('class', `plt-${plotId}-subtitle`)
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

module.exports = Subtitle
