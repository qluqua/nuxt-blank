<template lang="pug">
  include ../tools/all

  +b.page
    div Данные, полученные на сервере:
      pre {{ exampleData1 }}
      br
    div Данные, полученные на клиенте в mounted():
      pre {{ exampleData2 }}
      br
    div полученные на клиенте через action в сторе:
      pre {{ exampleState }}
      br
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
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
