<template>
  <div class="about">
    <SearchBox :location="location" :budget="budget" :apartment="apartment" :page="this.page"/>
    <v-container>
      <h2 class="title my-3">{{location? `Apartments in ${location}` : 'All apartments'}}</h2>
      <div class="houses" v-show="searchResults.length > 0">
        <House  v-for="apartment in searchResults" :key="apartment.id" :house="apartment" :modify="modify"/>
      </div>
      <p class="subheading" v-show="searchResults.length === 0">No results found</p>
    </v-container>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import House from '@/components/House.vue';

export default {
  props: ['page', 'modify'],
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
