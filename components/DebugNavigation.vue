<template lang="pug">
  include ../tools/all

  +b.debug-navigation
    +e.NUXT-LINK.locale(v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)") {{ locale.code }}
    | &nbsp;&mdash;&nbsp;
    +e.NUXT-LINK.link(:to="localePath('index')") {{ $t('pages.index') }}
    +e.NUXT-LINK.link(:to="localePath('grid')") grid
    +e.NUXT-LINK.link(:to="localePath('test')") {{ $t('pages.test') }}
</template>

<script lang="ts">
export default {
  name: 'DebugNavigation',
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.debug-navigation
  position fixed
  z-index 9999
  debug()
  color white
  bottom 0
  right 0
  left 0
  padding 10px

  &__link
    margin-right 10px
</style>
