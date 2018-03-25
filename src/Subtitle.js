const isString = require('lodash.isstring')

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
      inner: parseFloat(innerPadding),
      bot: parseFloat(bottomPadding)
    }

    this.x = 0
    this.y = parseFloat(yOffset)

    if (this.text !== '' && isString(this.text)) {
      this.text = this.parseMultiLineText(subtitleText)
      const linesOfText = this.text.length
      const numPaddingBtwnLines = Math.max(0, linesOfText)
      this.height =
        this.font.size * linesOfText +
        this.padding.inner * numPaddingBtwnLines +
        this.padding.bot
    } else {
      this.text = []
      this.height = 0
    }
  }

  parseMultiLineText (text) {
    return text.split('<br>')
  }

  setX (x) {
    this.x = x
  }

  setY (y) {
    this.y = y
  }

  getHeight () {
    return this.height
  }

  drawWith (plotId, svg) {
    svg.selectAll(`.plt-${plotId}-subtitle`).remove()
    return svg.selectAll(`.plt-${plotId}-subtitle`)
      .data(this.text)
      .enter()
      .append('text')
      .attr('class', `plt-${plotId}-subtitle`)
      .attr('x', this.x)
      .attr('y', (d, i) => this.y + (i * (this.font.size + this.padding.inner)))
      .attr('fill', this.font.color)
      .attr('font-family', this.font.family)
      .attr('font-size', this.font.size)
      .attr('text-anchor', 'middle')
      .style('dominant-baseline', 'text-before-edge')
      .text(d => d)
  }
}

module.exports = Subtitle
