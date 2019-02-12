<template lang="pug">
  include ../tools/all

  +b.debug-grid
    +e.grid._fixed
      +e.col(v-for="col in columns" :key="col") {{ col }}
    //- +e.grid
      //- +e.name {{ $t('hello') }}
      //- +e.info
        +e.e Grid breakpoints: {{ grid.breakpoints }}
        +e.e Grid columns: {{ grid.columns }}
        +e.e Grid gutters: {{ grid.gutters }}
        +e.e Grid-container offsets: {{ grid.offsets }}
        hr
        +e.e breakpoint: <strong>{{ breakpoint }}</strong> width: <strong>{{ windowWidth }}</strong> columns count: <strong>{{ columns }}</strong> gutter: <strong>{{ gutter }}</strong> offset: <strong>{{ offset }}</strong>
        +e.e Column width: {{ columnWidth }}
    //- +e.grid
      +e.row(v-for="i in 12" :key="i")
        +e.cell cell
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DebugGrid',
  computed: {
    ...mapState('ui', [
      'windowWidth',
      'breakpoint',
      'grid',
    ]),
    ...mapGetters('ui', [
      'columns',
      'gutter',
      'offset',
      'columnWidth'
    ]),
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

random(min, max)
  return floor(math(0, "random") * max + min)

strong
  display inline-block
  padding 0 3px

.debug-grid
  &__grid
    grid-container()
    display flex
    flex-direction column
    justify-content space-between
    width 100%
    user-select none
    pointer-events none

    &_fixed
      ghost()
      z-index 9999
      flex-direction row
      position fixed
      pointer-events none

  &__info
    position relative
    z-index 1
    padding 30px 0
    font-family Helvetica, sans-serif
    color #333
    background-color white

  &__col
    grid-size(1, 1, 1, 1, 1)
    debug()
    display flex
    align-items flex-start
    justify-content center
    padding-top 20px

  &__row
    margin 10px 0
    // outline 3px solid rgba(red, .3)

  &__cell
    debug()
    height 50px
    transition()

    .b__row:nth-child(2) &
      grid-size(config.columns.xs - 1, config.columns.sm - 2, config.columns.md / 2, config.columns.lg - 3, config.columns.xl - 4)
    .b__row:nth-child(7) &
      grid-size(config.columns.xs / 2, config.columns.sm / 2, config.columns.md / 2, config.columns.lg / 2, config.columns.xl / 2)
      grid-offset(2, 2, 2, 2, 2)
    .b__row:nth-child(7) &
      grid-size(1, 1, 1, 1, 1)
    .b__row:nth-child(8) &
      grid-size(2, 2, 2, 2, 2)
    .b__row:nth-child(9) &
      grid-size(3, 3, 3, 3, 3)
    .b__row:nth-child(10) &
      grid-size(4, 4, 4, 4, 4)
    .b__row:nth-child(11) &
      grid-size(4, 5, 5, 5, 5)
    .b__row:nth-child(12) &
      grid-size(4, 6, 6, 6, 6)
</style>
