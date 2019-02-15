<template>
  <div class="about">
    <SearchBox :location="location" :budget="budget" :apartment="apartment" :page="this.page"/>
    <v-container>
      <h2 class="title my-3">Apartments in {{location}}</h2>
      <div class="houses" v-show="searchResults.length > 0">
        <House  v-for="apartment in searchResults" :key="apartment.address" :house="apartment"/>
      </div>
      <p class="subheading" v-show="searchResults.length === 0">No results found</p>
    </v-container>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import House from '@/components/House.vue';
const apiUrl = 'http://localhost:3000/api/apartments/search';
import axios from 'axios';

export default {
  props: ['page'],
  data(){
    return {
    }
  },
  methods: {
    
  },
  computed: {
    searchResults(){
      return this.$store.state.searchResults
    },
    location(){
      return this.$store.state.searchQuery.location
    },
    budget(){
      return this.$store.state.searchQuery.budget
    },
    apartment(){
      return this.$store.state.searchQuery.apartmentType
    }
  },
  components: {
    SearchBox,
    House
  }
}
</script>

<style scoped>
.houses{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start
}

.house{
  width: 30%;
}
</style>
