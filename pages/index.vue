<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    +e.container
      div Данные, полученные на сервере:
        pre {{ exampleData1 }}
        br
      div Данные, полученные на клиенте в mounted():
        pre {{ exampleData2 }}
        br
      div полученные на клиенте через action в сторе:
        pre {{ exampleState }}
        br

    +e.H1.title grid
    +b.b
      +e.grid._fixed
        +e.col(v-for="col in columns" :key="col") {{ col }}
      +e.grid
        +e.name Hello
        +e.info
          +e.e Grid breakpoints: {{ grid.breakpoints }}
          +e.e Grid columns: {{ grid.columns }}
          +e.e Grid gutters: {{ grid.gutters }}
          +e.e Grid-container offsets: {{ grid.offsets }}
          hr
          +e.e breakpoint: <strong>{{ breakpoint }}</strong> width: <strong>{{ windowWidth }}</strong> columns count: <strong>{{ columns }}</strong> gutter: <strong>{{ gutterWidth }}</strong> offset: <strong>{{ offsetWidth }}</strong>
          //- +e.e Column width: {{ columnWidth }}
      +e.grid
        +e.row(v-for="i in 12" :key="i")
          +e.cell cell
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from 'vuex'
import { sleep, createRandomId } from '@/utils'

export default {
  name: 'PageIndex',
   data: () => ({
    showModal: null,
    exampleData1: {},
    exampleData2: {},
  }),
  computed: {
    ...mapState('example', {
      exampleState: 'exampleState',
    }),
    ...mapState('ui', [
      'windowWidth',
      'breakpoint',
      'grid',
    ]),
    ...mapGetters('ui', [
      'columns',
      'gutterWidth',
      'offsetWidth',
      // 'columnWidth'
    ]),
    id() {
      return createRandomId()
    },
  },
  async asyncData({ app: { $api } }) {
    const exampleData1 = await $api.fetchExample({ id: 1 })

    return {
      exampleData1,
    }
  },
  async mounted() {
    await sleep(1000)

    this.fetchExampleAction({ id: 1 })
    this.exampleData2 = await this.$api.fetchExample({ id: 1 })
  },
  methods: {
    ...mapActions('example', {
      fetchExampleAction: 'fetchExampleAction',
    }),
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.page
  &__container
    grid-container()
    position relative
    z-index 1
    background-color white

  &__title
    position relative
    z-index 1
    color white
    debug()

random(min, max)
  return floor(math(0, "random") * max + min)

strong
  display inline-block
  padding 0 3px

.b
  &__grid
    grid-container()
    display flex
    flex-direction column
    justify-content space-between
    width 100%

    &_fixed
      ghost()
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
