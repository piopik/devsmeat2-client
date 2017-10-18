import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  question: {},
  leaderboard: [],
  user: {}
}

const mutations = {
  QUESTION (state, q) {
    state.question = q;
  },
  LEADERBOARD (state, l) {
    state.leaderboard = l;
  }
}

const actions = {
  question (context, data) {
      context.commit('QUESTION', data)
  },
  leaderboard (context, data) {
    context.commit('LEADERBOARD', data)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
