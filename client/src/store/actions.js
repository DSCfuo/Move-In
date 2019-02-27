import axios from 'axios'
const apiUrl = '/api/apartments/search';

const actions = {
    searchApartment(context, {location, budget, apartmentType}){
      axios.get(apiUrl, {
        params: {
          location: location,
          price: budget,
          apartmentType: apartmentType,
        }
      })
      .then(res => {
          console.log("Search res", res)
          console.log("Search results from store", res.data.data)
        context.commit('updateSearchResults', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    },

    getAllApartments(context){
      axios.get('/api/apartments')
      .then(res => {
        console.log("All apartments", res)
        context.commit('updateApartments', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    },
    initialSearch(context){
      axios.get('/api/apartments')
      .then(res => {
        console.log("All apartments", res.data)
        context.commit('updateSearchResults', res.data.data)
      })
      .catch(err => {
        console.log("Failed to search", err)
      })
    },
    getListings(context){
      axios.get('/api/listings')
        .then(res => {
            context.commit('setListings', res.data.data)
            this.listings = res.data.data
        })
        .catch(err => {
            console.log("Failed to fetch listings", err.response)
        })
    }
  }

  export default actions;