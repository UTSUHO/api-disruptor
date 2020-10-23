<template>
  <a-layout>
    <Header />
    <a-layout-content style="height: 83vh">
      <Disruptor />
    </a-layout-content>
          <Footer />

  </a-layout>
</template>

<script>
import Header from "./pages/Header.vue";
import Disruptor from "./pages/Disruptor.vue";
import Footer from "./pages/Footer.vue";

export default {
  name: "App",
  components: {
    Disruptor,
    Header,
    Footer,
  },
};
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
