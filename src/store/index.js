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
    setChecked(state, payload) {
      if(typeof payload === 'number') return state.checked[payload] = true;
      if(typeof payload === 'string') return state.checked[payload] = true;
      state.checked = {};
    }
  },
  actions: {
  },
  modules: {
  }
})
