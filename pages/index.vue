<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}

    IconSvg(icon="twitter")
    +b.icon-svg
      +e.SVG.svg
        +e.USE.use(xlink:href="/images/sprite.svg#twitter")
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from 'axios'
import IconSvg from '~/components/IconSvg.vue'
import uniqueId from '~/assets/mixins/uniqueId'

export default Vue.extend({
  components: {
    IconSvg
  },
  computed: {
    ...mapState('ui', [
      // 'windowWidth'
    ]),
    id() {
      return uniqueId()
    }
  },
  mounted() {
    // console.log(this.windowWidth)
    // console.log(process, axios)
  }
})
</script>

<style lang="stylus" scoped>
@import '~assets/styles/tools'

h1
  color white
  debug()
</style>
