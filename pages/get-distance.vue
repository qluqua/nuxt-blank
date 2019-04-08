<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title distance: {{ distance }}px
    +e.el(ref="el")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import getDistance from '@/mixins/getDistance'

export default Vue.extend({
  name: 'get-distance',
  data: () => ({
    elParams: null,
    distance: null as number
  }),
  computed: {
    ...mapState('ui', [
      'screenSize'
    ]),
    ...mapGetters('ui', [
      'isDesktop',
      'screenSize'
    ])
  },
  watch: {
    screenSize(val) {
      if (process.client && this.isDesktop && val) this.getElementParams()
    }
  },
  mounted() {
    if (process.client && this.isDesktop) {
      this.getElementParams()
      window.onmousemove = this.mouseAnimation
    }
  },
  methods: {
    getElementParams() {
      const { top, right, bottom, left } = this.$refs.el.getBoundingClientRect()

      this.elParams = { top, right, bottom, left }
    },
    mouseAnimation(event) {
      const { clientX, clientY } = event
      const { top, right, bottom, left } = this.elParams
      const distance = getDistance(clientX, clientY, top, right, bottom, left)

      this.distance = distance
    }
  }
})
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.page
  &__el
    width 100px
    height 100px
    margin 10vh 0 0 10vw
    debug()
</style>
