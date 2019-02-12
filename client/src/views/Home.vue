<template>
  <div class="home">
    <div class="showcase pt-5">
      <h2 class="display-2 mx-auto white--text">Find the perfect apartment</h2>
      <h5 class="title mx-auto white--text">Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempo incididunt ut labore et dolore magna aliqua.</h5>

      <SearchBox />
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
  export default {
    components: {
      SearchBox,
    }
  }
</script>

<style scoped>
.showcase{
  text-align: center;
  min-height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0,0,0, 0.59)), url("../../public/images/apartment.jpg") center no-repeat ;
}

.showcase h2, .showcase h5{
  width: 60%;
  line-height: 1.5em !important;
}
</style>
