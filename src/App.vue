<template>
  <Header />
  <Disruptor/>
</template>

<script>
import Header from './pages/Header.vue'
import Disruptor from './pages/Disruptor.vue'

export default {
  name: 'App',
  components: {
    Disruptor,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
