<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    IconSvg(icon="twitter" class="page__icon")
    +e.PRE.test-data(v-if="testData") {{ testData }}

    //- @TODO: [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.
    //- +e.test(v-if="isIe") isIe
    //- +e.test(v-if="isEdge") isEdge
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import IconSvg from '@/components/IconSvg.vue'
import uniqueId from '@/mixins/uniqueId.ts'
import sleep from '@/mixins/sleep.ts'

export default {
  components: {
    IconSvg
  },
  computed: {
    ...mapState('ui', [
      'isIe',
      'isEdge'
    ]),
    id() {
      return uniqueId()
    }
  },
  async asyncData() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    return { testData: data.title }
  },
  head() {
    return {
      title: 'Index page',
      meta: [{ hid: 'Index page hid', name: 'Index page name', content: 'Index page content' }]
    }
  },
  async mounted() {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const start = performance.now()
    await sleep(1500)
    const time = (performance.now() - start) / 1000
    console.log(`Sleep time: ${time.toFixed(1)} seconds`)
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/tools'

.page
  &__icon
    background-color rgba(black, .2)

h1
  color white
  debug()
</style>
