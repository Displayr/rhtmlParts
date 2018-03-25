const isString = require('lodash.isstring')

class Footer {
  constructor ({
    footerText = '',
    footerFontColor = '#444444',
    footerFontSize = 8,
    footerFontFamily = 'arial',
    containerHeight = 0,
    topPadding = 10,
    bottomPadding = 10,
    innerPadding = 2
  }) {
    this.text = footerText
    this.font = {
      color: footerFontColor,
      size: parseFloat(footerFontSize),
      family: footerFontFamily
    }
    this.padding = {
      top: parseFloat(topPadding),
      bot: parseFloat(bottomPadding),
      inner: parseFloat(innerPadding)
    }

    if (this.text !== '' && isString(this.text)) {
      this.text = this.parseMultiLineText(footerText)
      const linesOfText = this.text.length
      const numPaddingBtwnLines = Math.max(0, linesOfText)
      this.height =
        this.font.size * linesOfText +
        this.padding.inner * numPaddingBtwnLines +
        this.padding.top + this.padding.bot
    } else {
      this.text = []
      this.height = 0
    }

    this.x = 0
    this.y = containerHeight - this.getHeight()
  }

  parseMultiLineText (text) {
    return text.split('<br>')
  }

  setX (x) {
    this.x = x
  }

  setContainerHeight (newHeight) {
    this.y = newHeight - this.getHeight()
  }

  getHeight () {
    return this.height
  }

  drawWith (plotId, svg) {
    svg.selectAll(`.plt-${plotId}-footer-container`).remove()

    this.footerContainer = svg.append('g')
      .attr('class', `plt-${plotId}-footer-container`)

    return this.footerContainer.selectAll(`.plt-${plotId}-footer-text`)
    .data(this.text)
    .enter()
    .append('text')
    .attr('class', `plt-${plotId}-footer`)
    .attr('x', this.x)
    .attr('y', (d, i) => this.padding.top + this.y + (i * (this.font.size + this.padding.inner)))
    .attr('fill', this.font.color)
    .attr('font-family', this.font.family)
    .attr('font-size', this.font.size)
    .attr('text-anchor', 'middle')
    .style('dominant-baseline', 'text-before-edge')
    .text(d => d)
  }
}

module.exports = Footer
