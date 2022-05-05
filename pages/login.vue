<template>
  <Login />
</template>

<script>
import Login from './components/Login/index'
export default {
  name: 'LoginPage',
  components: {
    Login
  },
  // 单独设置TDK
  head () {
    return {
      title: 'login title',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'login Meta description'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'login Meta keywords'
      }
      ]
    }
  }
}
</script>
