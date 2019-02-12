<template>
  <div class="home">
    <div class="showcase pt-5">
      <h2 class="display-1 mx-auto white--text">Find the perfect apartment</h2>
      <h5 class="title mx-auto white--text">Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempo incididunt ut labore et dolore magna aliqua.</h5>
    </div>
  </div>
</template>

<script>

  export default {
    components: {}
  }
</script>

<style scoped>
.showcase{
  text-align: center;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0,0,0, 0.59)), url("../../public/images/apartment.jpg") center no-repeat ;
}

.showcase h2, .showcase h5{
  width: 60%;
  line-height: 1.5em !important;
}
</style>
