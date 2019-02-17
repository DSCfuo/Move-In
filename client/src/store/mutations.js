const mutations = {
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
  }

  export default mutations;