<template>
  <div class="about">
    <SearchBox :location="location" :budget="budget" :apartment="apartment" />
    <v-container>
      <h2 class="title my-3">Apartments in {{location}}</h2>
      <div class="houses">
        <House  v-for="n in 8"/>
      </div>
    </v-container>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import House from '@/components/House.vue';
export default {
  data(){
    return{
      location: this.$route.query.location,
      budget: this.$route.query.budget,
      apartment: this.$route.query.apartment
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
