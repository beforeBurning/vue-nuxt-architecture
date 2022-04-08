<template>
  <div>
    id:{{ id }}
  </div>
</template>

<script>
export default {
  name: 'ArticlePage',
  data () {
    return {
      id: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>
</style>
