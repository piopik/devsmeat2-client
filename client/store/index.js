import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  question: {}
}

const mutations = {
  QUESTION (state, q) {
    state.question = q;
  }
}

const actions = {
  question (context, data) {
      context.commit('QUESTION', data)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
