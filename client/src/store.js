import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const apiUrl = 'http://localhost:3000/api/apartments/search';

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
  mutations: {
    updateSearchResults(state, results){
      state.searchResults = results
    },
    updateApartments(state, apartments){
      state.allApartments = apartments
    },
    searchQuery(state, search){
      state.searchQuery = search
    },
    removeApartment(state, id){
      console.log("In store trying to remove", id)
      state.searchResults = state.searchResults.filter(apartment => apartment.id !== id);
      state.allApartments = state.allApartments.filter(apartment => apartment.id !== id);
    },
    setListings(state,listings){
      state.listings = listings;
    },
    removeListing(state, id){
      console.log("In store trying to remove listing", id);
      state.listings = state.listings.filter((listing) => listing.id !== id);
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
    },

    getAllApartments(context){
      axios.get('http://localhost:3000/api/apartments')
      .then(res => {
        console.log("All apartments", res.data)
        context.commit('updateApartments', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    },
    initialSearch(context){
      axios.get('http://localhost:3000/api/apartments')
      .then(res => {
        console.log("All apartments", res.data)
        context.commit('updateSearchResults', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    },
    getListings(context){
      axios.get('http://localhost:3000/api/listings')
        .then(res => {
            context.commit('setListings', res.data.data)
            this.listings = res.data.data
        })
        .catch(err => {
            console.log("Failed to fetch listings", err)
        })
    }
  },
  getters: {
    getsearchResults(state){
      return state.searchResults
    }
  }
})
