<template lang="pug">
.ctn
  router-link(to="/") Home
  router-link(to="/game") Game
  router-link(to="/about") About
</template>

<style lang="scss" scoped>
  .ctn {
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    background-color: var(--blue);
    box-shadow: 0px 3px 10px 1px var(--shadow);
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: var(--white);
      }
    }
  }


</style>
