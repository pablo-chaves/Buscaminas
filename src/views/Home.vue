<template lang="pug">
.home
  HelloWorld
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
  .home {
    width: 80%;
    margin: auto;
  }
</style>
