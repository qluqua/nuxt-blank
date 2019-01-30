<template lang="pug">
  include ../tools/all

  +b.debug-navigation
    +e.NUXT-LINK.link(v-for="(route, index) in routes" :key="index" :to="route.path") {{ route.name }}
</template>

<script lang="ts">
export default {
  name: 'DebugNavigation',
  computed: {
    routes() {
      return this.$router.options.routes.reverse()
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '../styles/tools'

.debug-navigation
  position fixed
  z-index 9999
  debug()
  color white
  top 0
  right 0
  left 0
  padding 10px

  &__link
    margin-right 10px
</style>
