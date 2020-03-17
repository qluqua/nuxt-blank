<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { createRandomId, sleep } from '@/utils'

export default {
  name: 'PageTest',
  computed: {
    ...mapState('ui', [
      'isIe',
      'isEdge'
    ]),
    id() {
      return createRandomId()
    }
  },
  head() {
    return {
      title: 'Index page',
      meta: [{ hid: 'Index page hid', name: 'Index page name', content: 'Index page content' }]
    }
  },
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
