<template>
     <div class="showcase pt-5">
      <h2 class="display-2 mx-auto white--text">{{headerTitle}}</h2>
    </div>
</template>

<script>
export default {
    props: ['headerTitle']
}
</script>

<style scoped>
.showcase{
  text-align: center;
  min-height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0,0,0, 0.59)), url("../../public/images/apartment.jpg") center no-repeat ;
}

.showcase h2, .showcase h5{
  width: 60%;
  line-height: 1.5em !important;
}
</style>

