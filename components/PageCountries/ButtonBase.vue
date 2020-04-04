<template lang="pug">
  include ../../tools/all

  +b.button(:class="[theme, { 'is-disabled': disabled }]") {{ text }}
</template>

<script>
export default {
  name: 'ButtonBase',
  props: {
    text: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.button
  display flex
  align-items center
  height 28px
  padding 0 13px
  font-size 14px
  line-height 1
  font-weight 300
  text-transform capitalize
  color $cBlud
  border 1px solid $cBlue
  border-radius 14px
  cursor pointer
  transition()
  transition-property background-color, color, border-color
  user-select none

  +hover()
    background-color $cBlue
    border-color $cBlue
    color white

  &.is-disabled
    pointer-events none
    opacity .33

  &.primary
    background-color $cBlue
    border-color $cBlue
    color white

    +hover()
      background-color rgba($cBlue, .75)
      border-color rgba($cBlue, .75)

  &.outline-dark-background
    border-color white
    color white

    +hover()
      background-color white
      border-color white
      color $cBlue
</style>
