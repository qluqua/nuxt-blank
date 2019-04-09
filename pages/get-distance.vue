<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title move your mouse around the red circles
    +e.scene
      +e.el.js-circle-element(v-for="i in 1000" :key="i")
        +e.ghost.js-circle-ghost
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import getDistance from '@/mixins/getDistance'
import getAngle from '@/mixins/getAngle'

export default Vue.extend({
  name: 'get-distance',
  data: () => ({
    elements: [] as HTMLElement[],
    ghosts: [] as HTMLElement[],
    elementsRects: [] as any[],
  }),
  computed: {
    ...mapState('ui', [
      'screenSize',
      'scrollY'
    ]),
    ...mapGetters('ui', [
      'isDesktop',
      'screenSize'
    ])
  },
  watch: {
    screenSize(val) {
      if (process.client && this.isDesktop && val) this.getElementsParams()
    },
    scrollY() {
      if (process.client && this.isDesktop) this.getElementsParams()
    }
  },
  mounted() {
    if (process.client && this.isDesktop) {
      this.getElementsParams()
      window.onmousemove = this.mouseHandler
    }
  },
  methods: {
    getElementsParams() {
      const elements = Array.from(document.querySelectorAll('.js-circle-element')) as HTMLElement[]
      const ghosts = Array.from(document.querySelectorAll('.js-circle-ghost')) as HTMLElement[]
      const saveElementRect = el => {
        const { top, right, bottom, left } = el.getBoundingClientRect()

        this.elementsRects.push({ top, right, bottom, left })
      }

      this.elementsRects = []
      elements.forEach(saveElementRect)

      this.elements = elements
      this.ghosts = ghosts
    },
    mouseHandler(event) {
      const { clientX, clientY } = event
      const { elements, ghosts, elementsRects } = this
      const animateGhosts = i => {
        const element = elements[i]
        const ghost = ghosts[i]
        const { top, right, bottom, left } = elementsRects[i]
        const distance = getDistance(clientX, clientY, top, right, bottom, left)
        const range = 200

        if (distance > range) return

        const angle = getAngle(clientX, clientY, element, top, left)
        const factor = 7
        const progress = (range - distance) / range
        const translateXMax = Math.sin(angle * Math.PI / 180) * range / factor
        const translateYMax = Math.cos(angle * Math.PI / 180) * -range / factor
        let translateX = Math.sin(angle * Math.PI / 180) * progress * range / factor
        let translateY = Math.cos(angle * Math.PI / 180) * -(progress * range / factor)

        // @TODO: @!!@!@
        if (progress > .5) {
          translateX = translateXMax - translateX
          translateY = translateYMax - translateY
        }

        ghost.setAttribute('style', `transform: translate(${translateX}px, ${translateY}px);`)
      }

      for (let i = 0; i < elements.length; i++) {
        animateGhosts(i)
      }
    },
  }
})
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.page
  &__scene
    display flex
    flex-wrap wrap
    min-height 100vh

  &__el
    position relative
    width 100px
    height 100px
    margin 30px
    border-radius 50%
    debug()

  &__ghost
    ghost()
    debug()
    border-radius 50%
    cursor pointer
</style>
