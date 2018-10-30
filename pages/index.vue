<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    IconSvg(icon="twitter")
    +e.PRE.test-data(v-if="testData") {{ testData }}
</template>

<script>
import axios from 'axios'
import IconSvg from '~/components/IconSvg'
import uniqueId from '~/assets/mixins/uniqueId'

export default {
  components: {
    IconSvg
  },
  computed: {
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/styles/tools'

h1
  color white
  debug()
</style>
