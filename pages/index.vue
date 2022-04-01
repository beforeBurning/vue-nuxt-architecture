<template>
  <div>
    {{ token }}
    <nuxt-link to="/login">
      login
    </nuxt-link>
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
