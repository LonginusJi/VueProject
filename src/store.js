import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    listItems: []
  },
  mutations: {
      SET_ITEMS (state, listItems) {
          state.listItems = listItems
      }
  },
  actions: {
      loadItems ({ commit }) {
          axios
              .get('http://localhost:4000/results')
              .then(r => r.data)
              .then(listItems => {
                  commit('SET_ITEMS', listItems)
              })
      }
  }
})
