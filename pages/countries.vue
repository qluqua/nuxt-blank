<template lang="pug">
  include ../tools/all

  +b.b
    +e.header Travel Planner
    +e.main
      +e.col
        +e.subheading(key="subheading") Route
        +e.TRANSITION-GROUP.list(
          tag="div"
          appear
        )
          +e.LIST-ITEM.li._roadmap(
            v-for="country of roadmap"
            :key="country.name"
            v-bind="country"
            action="remove"
            @remove="removeCountry"
          )
        +e.controls(key="controls")
          +e.BUTTON-BASE.btn(
            text="Clear"
            theme="primary"
            :disabled="!roadmapKeys.length"
            @click.native="clearRoadmap"
          )
          +e.BUTTON-BASE.btn(
            text="Send"
            theme="primary"
            :disabled="!roadmapKeys.length || isSendingData"
            @click.native="sendRoadmap"
          )
      +e.col
        +e.subheading Countries
        +e.list
          +e.LIST-ITEM.li(
            v-for="country of countries"
            :key="country.name"
            v-bind="country"
            :darkBackground="true"
            action="add"
            :actionDisabled="roadmapKeys.includes(country.name)"
            @add="addCountry"
          )
</template>

<script lang="ts">
import ListItem from '@/components/PageCountries/ListItem.vue'
import ButtonBase from '@/components/PageCountries/ButtonBase.vue'

const LOCAL_STORAGE_KEY = 'test-travel-planner'

export default {
  name: 'PageCountries',
  components: {
    ListItem,
    ButtonBase,
  },
  async asyncData({ app: { $api } }) {
    const countries = await $api.fetchCountries()

    return {
      countries,
    }
  },
  head() {
    return {
      title: 'Travel Planner',
    }
  },
  data: () => ({
    roadmapKeys: [],
    isSendingData: null,
  }),
  computed: {
    roadmap() {
      return this.roadmapKeys.map(key => this.countries.find(country => country.name === key))
    },
  },
  mounted() {
    this.restoreLocalState()
  },
  methods: {
    async sendRoadmap() {
      this.isSendingData = true
      const response = await this.$api.sendRoadmap()
      const message = response?.status === 201
        ? `Your trip plan successfully saved. Countries count: ${this.roadmapKeys.length}`
        : 'Something went wrong, please try again later'

      alert(message)
      this.isSendingData = false
    },
    clearRoadmap() {
      this.roadmapKeys = []
      this.clearLocalState()
    },
    clearLocalState() {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    },
    restoreLocalState() {
      const localState = window.localStorage.getItem(LOCAL_STORAGE_KEY)

      if (localState) {
        this.roadmapKeys = JSON.parse(localState)
      }
    },
    saveLocalState() {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.roadmapKeys))
    },
    addCountry(countryName) {
      if (!this.roadmapKeys.includes(countryName)) {
        this.roadmapKeys.push(countryName)
      }
      this.saveLocalState()
    },
    removeCountry(countryName) {
      this.roadmapKeys = this.roadmapKeys.filter(key => key !== countryName)
      this.saveLocalState()
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

$headerHeight = 70px

container-padding()
  padding 0 15px

.b
  &__header
    display flex
    align-items center
    height $headerHeight
    container-padding()
    font-size 28px
    color white
    background-color $cBlueLight

  &__main
    display flex

    +xs()
      flex-direction column

  &__col
    flex 1
    display flex
    flex-direction column
    padding-top 20px
    padding-bottom 30px

    &:first-child
      color $cBlueLight
      background-color white

    &:last-child
      color white
      background-color $cBlue

    +gt-sm()
      height 'calc(100vh - %s)' % $headerHeight
      overflow-y scroll

  &__subheading
    margin-bottom 15px
    container-padding()
    font-weight bold

  &__li
    &_roadmap
      &:not(:last-child)
        position relative

        &:before
          content ''
          position absolute
          left 30px
          bottom 0
          transform translate(-50%, 0%)
          width 10px
          height 10px
          background-image url('../assets/images/svg/arrow-outline-down.svg')
          background-color transparent
          background-size contain
          background-position center top
          background-repeat no-repeat

    &.v-enter-active
    &.v-leave-active
      transition()
      transition-timing-function $uberTiming
      transition-duration .3s

    &.v-enter
    &.v-leave-to
      opacity 0
      transform translateX(-100%)

  &__controls
    display flex
    justify-content flex-end
    align-items center
    margin-top auto
    container-padding()
    padding-top 30px

  &__btn
    &:not(:last-child)
      margin-right 12px
</style>
