<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    +e.PRE.test-data(v-if="testData") {{ testData }}
</template>

<script lang="ts">
import { mapState } from 'vuex'
import uniqueId from '@/mixins/uniqueId.ts'
import sleep from '@/mixins/sleep.ts'

export default {
  name: 'test',
  computed: {
    ...mapState('ui', [
      'isIe',
      'isEdge'
    ]),
    id() {
      return uniqueId()
    }
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('https://jsonplaceholder.typicode.com/todos/1')
    console.log(data)
    return { testData: data.title }
  },
  head() {
    return {
      title: 'Index page',
      meta: [{ hid: 'Index page hid', name: 'Index page name', content: 'Index page content' }]
    }
  },
  // async mounted() {
  //   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  //   const start = performance.now()
  //   await sleep(1500)
  //   const time = (performance.now() - start) / 1000
  //   console.log(`Sleep time: ${time.toFixed(1)} seconds`)
  // }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.page
  &__icon
    background-color rgba(black, .2)

.test
  grid-size(2, 6, 4, 2, 10)
  height 100px
  debug()

  +xs()
    outline 3px solid red

h1
  color white
  debug()
</style>
