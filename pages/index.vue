<template lang="pug">
  include ../tools/all

  +b.page
    +e.H1.title {{ id }}
    IconSvg(icon="twitter")
    +e.PRE.test-data(v-if="testData") {{ testData.status }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import IconSvg from '~/components/IconSvg.vue'
import uniqueId from '~/assets/mixins/uniqueId'

export default Vue.extend({
  components: {
    IconSvg
  },
  computed: {
    ...mapState('data', [
      'testData'
    ]),
    id() {
      return uniqueId()
    }
  },
  created() {
    this.getTestData()
  },
  methods: {
    ...mapActions('data', [
      'getTestData'
    ])
  }
})
</script>

<style lang="stylus" scoped>
@import '~assets/styles/tools'

h1
  color white
  debug()
</style>
