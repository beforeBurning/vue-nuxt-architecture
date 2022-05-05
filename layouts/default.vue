<template>
  <div id="main">
    <Header />
    <Nuxt class="main" />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'LayoutsDefault',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
  .main {
    background: #f0f2f5;
    min-height: 100px;
  }
</style>
