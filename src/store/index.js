import { createStore } from 'vuex'

export default createStore({
  state: {
    level: {level: 'easy', cant: 7, loser: false, win: false},
    mines: 15,
    checkMines: 0,
    checked: {},
  },
  mutations: {
    setState(state, payload) {
      state = payload 
    },
    setLevel(state, payload) {
      state.level = payload 
    },
    setMines(state, payload) {
      state.mines = payload
    },
    setCheckMines(state, payload) {
      state.checkMines = payload
    },
    setChecked(state, { id, flag } = {} ) {
      console.log(typeof flag )
      if(typeof flag === 'boolean') return state.checked[id] = false;
      if(typeof id === 'number') return state.checked[id] = true;
      if(typeof id === 'string') return state.checked[id] = true;
      state.checked = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
