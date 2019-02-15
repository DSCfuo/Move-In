import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const apiUrl = 'http://localhost:3000/api/apartments/search';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResults: [],
  },
  mutations: {
    updateSearchResults(state, results){
      state.searchResults = results
    }
  },
  actions: {
    searchApartment(context, {location, budget, apartmentType}){
      axios.get(apiUrl, {
        params: {
          location: location,
          price: budget,
          apartmentType: apartmentType,
        }
      })
      .then(res => {
        context.commit('updateSearchResults', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    }
  },
  getters: {
    getsearchResults(state){
      return state.searchResults
    }
  }
})
