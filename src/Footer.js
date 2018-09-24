const { splitIntoLines } = require('./labelUtils')
const REALLY_LARGE_SCREEN_WIDTH_CAUSING_NO_WRAPPING = 15000

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
      bottom: parseFloat(bottomPadding),
      inner: parseFloat(innerPadding)
    }

    this.height = null
    this.x = 0
    this.y = containerHeight - this.getHeight()
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

  setContainerHeight (containerHeight) {
    this.containerHeight = containerHeight
  }

  drawWith (plotId, svg) {
    svg.selectAll(`.plt-${plotId}-footer`).remove()

    if (this.text !== '') {
      let lines = splitIntoLines(this.text, this.maxWidth, this.font.size, this.font.family)
      this.height =
        this.padding.top +
        this.font.size * lines.length + this.padding.inner * (lines.length - 1) +
        this.padding.bottom

      this.y = this.containerHeight -
        this.padding.bottom -
        (this.font.size * lines.length + this.padding.inner * (lines.length - 1))

      lines.forEach((text, lineIndex) => {
        svg.append('text')
          .attr('class', `plt-${plotId}-footer`)
          .attr('x', this.x)
          .attr('y', this.y + (this.font.size + this.padding.inner) * lineIndex)
          .attr('fill', this.font.color)
          .attr('font-family', this.font.family)
          .attr('font-size', this.font.size)
          .attr('text-anchor', 'middle')
          .style('dominant-baseline', 'text-before-edge')
          .text(text)
      })
    } else {
      this.height = 0
    }
  }
}

module.exports = Footer
