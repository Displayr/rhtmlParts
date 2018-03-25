class Title {
  constructor ({
    text = '',
    fontColor = '#333333',
    fontSize = 16,
    fontFamily = 'arial',
    topPadding = 10,
    bottomPadding = 10
  }) {
    this.text = text
    this.font = {
      color: fontColor,
      size: parseFloat(fontSize),
      family: fontFamily
    }
    this.padding = {
      top: parseFloat(topPadding),
      bot: parseFloat(bottomPadding)
    }

    this.height = this.font.size

    this.x = 0
    this.y = this.padding.top
  }

  setX (x) {
    this.x = x
  }

  setY (y) {
    this.y = y
  }

  getHeight () {
    return this.padding.top + this.height + this.padding.bot
  }

  drawWith (plotId, svg) {
    if (this.text !== '') {
      svg.selectAll(`.plt-${plotId}-title`).remove()
      return svg.append('text')
        .attr('class', `plt-${plotId}-title`)
        .attr('x', this.x)
        .attr('y', this.y)
        .attr('fill', this.font.color)
        .attr('font-family', this.font.family)
        .attr('font-size', this.font.size)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'normal')
        .style('dominant-baseline', 'text-before-edge')
        .text(this.text)
    }
  }
}

module.exports = Title
