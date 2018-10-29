<template lang="pug">
  include ../tools/bemto

  +b.page
    +e.H1.title {{ id }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import uniqueId from '~/assets/mixins/uniqueId'

export default Vue.extend({
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
  }
})
</script>

<style lang="stylus" scoped>
@import '~assets/styles/tools'

h1
  color white
  debug()
</style>
