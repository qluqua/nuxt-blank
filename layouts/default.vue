<template lang="pug">
  include ../tools/all

  +b.app#app(v-cloak)
    DebugNavigation
    nuxt
</template>

<script lang="ts">
import DebugNavigation from '@/components/DebugNavigation.vue'

export default {
  name: 'default',
  components: {
    DebugNavigation,
  }
}
</script>

<style lang="stylus">
@import '../styles/tools'

.app
  //
</style>
