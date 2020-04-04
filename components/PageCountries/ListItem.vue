<template lang="pug">
  include ../../tools/all

  +b.list-item
    +e.col
      +e.flag(
        v-if="flag"
        :style="`background-image: url(${flag});`"
      )
      +e.name {{ name }}
    +e.col(v-if="action")
      +e.BUTTON-BASE.btn(
        :text="action"
        :theme="darkBackground ? 'outline-dark-background' : ''"
        :disabled="actionDisabled"
        @click.native="dispatchAction"
      )
</template>

<script>
import ButtonBase from '@/components/PageCountries/ButtonBase'

export default {
  name: 'ListItem',
  components: {
    ButtonBase,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    flag: {
      type: String,
      required: true,
    },
    darkBackground: {
      type: Boolean,
      required: false,
    },
    action: {
      type: String,
      requried: false,
    },
    actionDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dispatchAction() {
      if (!this.actionDisabled) {
        this.$emit(this.action, this.name)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.list-item
  display flex
  align-items center
  justify-content space-between
  padding 13px 15px
  transition(background-color)

  +hover()
    background-color rgba(white, .1)

  &__col
    display flex
    align-items center

  &__flag
    width 30px
    height 30px
    background-position center center
    background-size 100% auto
    background-repeat no-repeat
    backrgound-color transparent
    margin-right 8px

  &__btn
    &:not(:last-child)
      margin-right 6px
</style>
