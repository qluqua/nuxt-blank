<template lang="pug">
  include ../tools/all

  +b.debug-navigation
    <nuxt-link :to="switchLocalePath('ru')">Русский</nuxt-link> /
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    | &nbsp;&mdash;&nbsp;
    +e.NUXT-LINK.link(:to="localePath('index')") {{ $t('pages.index') }}
    +e.NUXT-LINK.link(:to="localePath('test')") {{ $t('pages.test') }}
</template>

<script lang="ts">
export default {
  name: 'DebugNavigation',
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
