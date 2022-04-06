<template>
  <div>
    {{ token }}
    <nuxt-link to="/login">
      to login
    </nuxt-link>
    <p>111</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapState({
      token: state => state.token
    })
  }
}
</script>

<style scoped lang='less'>
p {
  color: red;
}
</style>
