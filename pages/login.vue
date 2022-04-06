<template>
  <div>
    <nuxt-link to="/">
      to index
    </nuxt-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  mounted () {
    this.SET_TOKEN('xxxx')
  },
  methods: {
    ...mapMutations([
      'SET_TOKEN'
    ])
  }
}
</script>

<style scoped lang='less'>
</style>
