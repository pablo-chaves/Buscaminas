<template lang="pug">
.hello
  h1 Buscaminas
  h4 Personaliza tu juego
  .ctn
    form(@submit.prevent="handlerSubmit")
      .radio
        h3 Dificultad
        input(type="radio" name="level" value="easy" @input="setLevel(levels[$event.target.value])")
        label(for="easy") Fácil
        input(type="radio" name="level" value="medium"  @input="setLevel(levels[$event.target.value])")
        label(for="easy") Normal
        input(type="radio" name="level" value="hard"  @input="setLevel(levels[$event.target.value])")
        label(for="easy") Difícil
      .mine
        h3 Ingresa tu numero de minas
        h5 Cantidad min: {{min}} - max: {{max}}
        input(type="number" :placeholder="min" :min="min" :max="max" @input="setMines($event.target.value)")
      div
        button(type="submit") Jugar

</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      newGame: (item) => this.setLevel(item),
      check: () => this.setChecked(),
      initialMines: (item) => this.setMines(item),
      levels: {
        easy: {level: 'easy', cant: 6 , loser: false, win: false},
        medium: {level: 'medium', cant: 10 , loser: false, win: false},
        hard: {level: 'hard', cant: 20 , loser: false, win: false}
      }
    }
  },
  computed: {
    ...mapState(['level', 'mines']),
    min() {
      return Math.round((this.level.cant * this.level.cant )/ 3)
    },
    max() {
      return Math.round((this.level.cant * this.level.cant )/ 2)
    }
  },
  methods: {
    ...mapMutations(['setLevel', 'setMines', 'setChecked']),
    handlerSubmit() {
      if(this.mines < this.min || this.mines > this.max) this.initialMines(this.min)
      this.check();
      this.newGame({...this.level, loser: false, win: false});
      document.location.href = document.location.href + 'game'
    }
  }
  
}
</script>

<style scoped lang="scss">
  .ctn {
    background-color: var(--white);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 3px 10px 1px var(--shadow);
  }
  .mine {
    margin-bottom: 20px;
  } 

  button {
    background-color: var(--blue);
    border: none;
    padding: 10px;
    border-radius: 3px;
  }
</style>
