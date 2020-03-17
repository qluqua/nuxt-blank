<template lang="pug">
  include ../tools/all

  +b.page index.vue
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex' // eslint-disable-line
import { sleep } from '@/utils'

export default {
  name: 'PageIndex',
   data: () => ({
    showModal: null,
    exampleData1: {},
    exampleData2: {},
  }),
  computed: {
    ...mapState('example', {
      exampleState: 'exampleState',
    }),
  },
  async asyncData({ app: { $api } }) {
    const exampleData1 = await $api.fetchExample({ id: 1 })

    return {
      exampleData1,
    }
  },
  async mounted() {
    await sleep(1000)

    this.fetchExampleAction({ id: 1 })
    this.exampleData2 = await this.$api.fetchExample({ id: 1 })
  },
  methods: {
    ...mapActions('example', {
      fetchExampleAction: 'fetchExampleAction',
    }),
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/tools'

.page
  //
</style>
