<template lang="pug">
  include ../tools/all

  #app
    DebugNavigation
    nuxt
</template>

<script lang="ts">
import DebugNavigation from '@/components/DebugNavigation.vue'

export default {
  name: 'default',
  components: {
    DebugNavigation
  }
}
</script>

<style lang="stylus">
@import '../styles/tools'

body
  padding-top 40px
</style>
