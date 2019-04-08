<template lang="pug">
  include ../tools/all

  +b.debug-navigation
    +e.NUXT-LINK.locale(v-for="locale in availableLocales" :key="locale" :to="switchLocalePath(locale)") {{ locale }}
    | &nbsp;&mdash;&nbsp;
    +e.NUXT-LINK.link(:to="localePath('index')") {{ $t('pages.index') }}
    +e.NUXT-LINK.link(:to="localePath('grid')") grid
    +e.NUXT-LINK.link(:to="localePath('test')") {{ $t('pages.test') }}
    +e.NUXT-LINK.link(:to="localePath('get-distance')") get-distance
</template>

<script lang="ts">
import locales from '@/locales'

export default {
  name: 'DebugNavigation',
  computed: {
    availableLocales() {
      return Object.keys(locales).filter(locale => {
        return locale !== this.$store.state.i18n.locale
      })
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
