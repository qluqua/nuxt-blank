<template>
  <section class="container">
    <h1>{{ id }}</h1>
  </section>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
h1
  color red
</style>

<script lang="ts">
import Vue from 'vue'
import uniqueId from '../mixins/uniqueId.ts'

export default Vue.extend({
  computed: {
    id() {
      return uniqueId()
    }
  }
})
</script>
