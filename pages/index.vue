<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    IconSvg(icon="twitter")
    +e.PRE.test-data(v-if="testData") {{ testData }}
    +e.test(v-if="isIe") isIe
    +e.test(v-if="isEdge") isEdge
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import IconSvg from '@/components/IconSvg'
import uniqueId from '@/mixins/uniqueId'

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
  mounted() {
    debugger
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/tools'

h1
  color white
  debug()
</style>
