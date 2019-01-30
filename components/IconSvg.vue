<template lang="pug">
  include ../tools/all

  +b.icon-svg
    +e.SVG.svg(:style="inlineStyles")
      +e.USE.use(:xlink:href="iconPath")
</template>

<script>
export default {
  props: {
    icon: String,
    width: String,
    height: String,
  },
  computed: {
    iconPath() {
      return `/images/sprite.svg#${this['icon'] || ''}`
    },
    inlineStyles() {
      let stylesString = ''
      const width = this['width']
      const height = this['height']

      if (width) stylesString += `width:${+width}px;`
      if (height) stylesString += `height:${+height}px;`

      return stylesString
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../styles/tools'

.icon-svg
  font-size 0
  line-height 0

  &__svg
    display flex
    align-items center
    max-width 100%
    max-height 100%

  &__use
    //
</style>
