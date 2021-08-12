<template lang="pug">
.ctn
  .divNav
   nav-bar
  router-view
</template>
<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>
<style lang="scss">
:root {
  --blue: #76bbd6;
  --back: #f5f5f5;
  --white: #fff;
  --black: #313131;
  --green: #42b983;
  --shadow: rgba(0,0,0,0.4);
  --red: red;
}
body {
  padding: 0;
  margin: 0;
  background-color: var(--back);
}
.ctn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .divNav {
    margin-bottom: 20px;
  }
}



</style>
