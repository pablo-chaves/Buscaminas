<template lang="pug">
.ctn
  .control
    .mines
      span Minas encontradas
        div {{checkMines}}
    button(@click="handlerClick") Volver a iniciar
    .mines
      span Numero de minas
        div {{mines}}
  .ctnBoard
    board
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Board from '@/components/Board.vue';
export default {
  components: {
    Board
  },
  data() {
    return {
      newGame: (item) => this.setLevel(item),
      check: () => this.setChecked()
    }
  },
  computed: {
    ...mapState(['mines', 'checkMines', 'level'])
  },
  methods: {
    ...mapMutations(['setLevel', 'setLevel', 'setCheckMines', 'setChecked']),
    handlerClick() {
      this.check();
      this.newGame({...this.level, loser: false, win: false});
    }
  }
}
</script>
<style lang="scss" scoped>
  .control {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;

    button {
      background-color: var(--green);
      border: none;
      padding: 10px;
      border-radius: 3px;
      height: 80%;
    }
    .mines {

      div {
        color: var(--red);

      }
    }
  }

  .ctnBoard {
    width: 80%;
    margin: auto;
  }
</style>