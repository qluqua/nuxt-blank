<template lang="pug">
  include ../tools/all

  +b.app#app(v-cloak)
    DebugGrid(v-if="showDebugGrid")
    nuxt
</template>

<script lang="ts">
import DebugGrid from '@/components/DebugGrid.vue'

export default {
  name: 'Default',
  components: {
    DebugGrid,
  },
  computed: {
    showDebugGrid() {
      return Object.keys(this.$route.query).includes('debug')
    },
  },
}
</script>

<style lang="stylus">
@import '~@/styles/tools'

.app
  overflow hidden
</style>
