import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResults: [],
    allApartments: [],
    searchQuery: {
      location: '',
      budget: '',
      apartmentType: '',
    },
    listings: [],
  },
  mutations,
  actions,
  getters
})
