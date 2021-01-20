<template>
  <div id="app">
    <links-list/>
  </div>
</template>

<script>
import LinksList from './components/LinksList.vue';


export default {
  name: 'App',
  components: {
    LinksList,
  }
}
</script>

<style>
body {
  background-color: rgb(29, 25, 77);
}
</style>
