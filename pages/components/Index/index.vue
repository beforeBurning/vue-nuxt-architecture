<template>
  <div>
    <nuxt-link to="/login">
      to login
    </nuxt-link>
    <div class="box">
      <i class="iconfont iconsousuo" />
      <p>token: {{ token }}</p>
    </div>
    <div class="list">
      <nuxt-link to="/article/1">
        id:1
      </nuxt-link>
      <nuxt-link to="/article/2">
        id:2
      </nuxt-link>
      <nuxt-link to="/article/3">
        id:3
      </nuxt-link>
    </div>
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
.box {
  display: flex;
  i {
    font-size: 14px;
  }
  p {
    color: @color-primary;
  }
}
.list {
  display: flex;
  flex-direction: column;
}
</style>
