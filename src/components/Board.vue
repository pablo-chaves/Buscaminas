<template lang="pug">
.ctn
  .board(:style="{ 'grid-template-columns': `repeat(${level.cant}, 32px)`, 'grid-template-rows': `repeat(${level.cant}, 32px)`}")
    div(v-for="(mine, index) of minesRandom" @click="handlerClick" @mousedown="handlerClickRight" :id="index" :class="{active: checked[index] }")
      div(v-if="checked[index] && !mine.mine" :style="{'color': colors[mine.value]}") {{mine.value}}
      img.imgMine(v-if="finish === index" src="@/assets/minaRoja.png")
      img.imgMine(v-else-if="checked[`${index}r`]" src="@/assets/flag.png")
      img.imgMine(v-else-if="checked[index] && mine.mine" src="@/assets/mina.png")
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      arrayBackup: [],
      finishId: '',
      finishLevel: (item) => this.setLevel(item),
      check: (item, flag) => this.setChecked(item, flag),
      colors: {
        1: 'blue',
        2: 'green',
        3: 'red',
        4: '#010175',
        5: '#006400;',
        6: '#640000;',
        7: '#273d9c;',
        8: '#93f75a',
      }
    }
  },
  computed: {
    ...mapState(['mines','level', 'checked']),
    minesRandom() {
      let count = 0;
      const arrayResult = [];
      const verification = (position, boardRow) => {
        let num = 0
        let array = [
          arrayResult[position - boardRow -1],
          arrayResult[position - boardRow],
          arrayResult[position - boardRow +1],
          arrayResult[position - 1],
          arrayResult[position + 1],
          arrayResult[position + boardRow -1],
          arrayResult[position + boardRow],
          arrayResult[position + boardRow +1]
        ]

        for(let i=0; i < array.length; i++) {
          if (position % boardRow === 0) {
            if (i === 0 || i === 3 || i === 5) continue;
          }
          if ((position +1 ) % boardRow === 0) {
            if (i === 2 || i === 4 || i === 7) continue;
          }
          if(array[i] && array[i].mine) num++
        }
        arrayResult[position].value = num
        return num;
      }
      const countMine = (numMines, num = 1) => {
        let mine = Math.round(Math.random() * num);
        if(count < numMines) {
          if(mine === num){
            count++
            return true;
          }
          return false;
        } 
        return false;
      }
      if(!this.level.loser && !this.level.win) {
        this.finish = ''
        while(arrayResult.length < (this.level.cant * this.level.cant)) {
          arrayResult.push({
            mine: countMine(this.mines, 2),
            position: arrayResult.length,
            value:0,
          })
        }
        this.arrayBackup = arrayResult;
      }

      if(this.level.loser || this.level.win) return this.arrayBackup;
      arrayResult.forEach((e, index) => {
        if (count < this.mines && !e.mine) e.mine = countMine(this.mines)
        e.value = verification(index, this.level.cant)
      })
      count = 0
      return arrayResult;
    }
  },
  methods: {
    ...mapMutations(['setLevel', 'setMines', 'setChecked']),
    handlerClickRight(e){

      if(e.which == 3) {
        document.oncontextmenu = () => false;
        if(this.checked[`${e.target.id}r`]) {
          console.log(this.checked)
          this.check({ id:`${e.target.id}r`, flag: false })  
        }
        this.check({ id: `${e.target.id}r` })
      }

    },
    handlerClick(e) {
      
      const gameOver = (id) => {
        for(let i=0; i < this.minesRandom.length; i++) {
          if(this.minesRandom[i].mine) {
            this.check({id: i})
          }
        }
        this.finish = id 
        this.finishLevel({...this.level, loser: true})
      }
    
      const positionId = Number(e.target.id);
      if(!this.level.loser && !this.checked[positionId]) {

        if(this.minesRandom[positionId].mine) return gameOver(positionId);

        if(this.minesRandom[positionId].value === 0) {
          const open = (position, boardRow) => {
            let array = [
              this.minesRandom[position - boardRow -1],
              this.minesRandom[position - boardRow],
              this.minesRandom[position - boardRow +1],
              this.minesRandom[position - 1],
              this.minesRandom[position + 1],
              this.minesRandom[position + boardRow -1],
              this.minesRandom[position + boardRow],
              this.minesRandom[position + boardRow +1]
            ]
            for(let i=0; i < array.length; i++) {
              if (position % boardRow === 0) {
                if (i === 0 || i === 3 || i === 5) continue;
              }
              if ((position +1 ) % boardRow === 0) {
                if (i === 2 || i === 4 || i === 7) continue;
              }
              if(array[i] && !array[i].mine) {
                
                if(array[i].value === 0) {
                  console.log(array, i)
                  // open(array[i].position, boardRow);
                }
                this.check({ id: array[i].position });
                
              }
            }
          }
          open(positionId, this.level.cant);
        }
        this.check({ id: positionId })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ctn {
  background-color: var(--white);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 3px 10px 1px var(--shadow);
}
.board{
  display:grid;
  justify-content: center;

  div {
    background-color: #BBBBBB;
    border-left: 2px solid #D3D3D3;
    border-top: 2px solid #D3D3D3;
    border-right: 2px solid #A9A9A9;
    border-bottom: 2px solid #A9A9A9;
    text-align: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      border: none;
      background-color: transparent;
    }
    .imgMine {
      width: 60%;
    }
  }
  div:hover {
    border-right: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    border-left: 1px solid #A9A9A9;
    border-top: 1px solid #A9A9A9;
  }
  .active {
    background-color: #adadad;
    border-right: 1px solid #D3D3D3;
    border-bottom: 1px solid #D3D3D3;
    border-left: 1px solid #A9A9A9;
    border-top: 1px solid #A9A9A9;
  }
}
</style>