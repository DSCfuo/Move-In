<template>
  <div class="home white">
    <div class="showcase pt-5">
      <h2 class="display-2 mx-auto white--text">Find the perfect apartment</h2>
      <h5 class="title mx-auto white--text">Search for available houses, shops and offices in the location you want, at the price you want.
        Your perfect apartment is just a click away
      </h5>
      <SearchBox :location="location" :budget="budget" :apartment="apartment" page="search" />
      <ReviewPopup />
    </div>
    <v-container>
        <div class="cities">
          <h2 class="title my-3">Popular Cities</h2>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md3 class="city">
              <img src="../../public/images/lagos.jpg" alt="Failed to load Image">
              <p>Lagos</p>
            </v-flex>
            <v-flex xs12 md3 class="city">
              <img src="../../public/images/imo.jpg" alt="Failed to load Image">
              <p>Imo</p>
            </v-flex>
            <v-flex xs12 md3 class="city">
              <img src="../../public/images/abuja.jpg" alt="Failed to load Image">
              <p>Abuja</p>
            </v-flex>
          </v-layout>
        </div>

        <div class="about py-3 px-2" id="about">
          <h2 class="title my-3 text-xs-center">There are a log of rental services. Why would you choose us?</h2>
          <p class="text-xs-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eos veniam esse pariatur libero
            mollitia in labore veritatis praesentium quas quis, iste sapiente repellendus quasi iusto dolore
            similique eligendi voluptates?>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eos veniam esse 
            pariatur libero mollitia in labore veritatis praesentium quas quis, iste sapiente repellendus quasi iusto dolore
            similique eligendi voluptates?>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eos veniam esse 
            pariatur liber mollitia in labore veritatis praesentium quas quis, iste sapiente repellendus quasi iusto dolore
            similique eligendi voluptates?</p>
        </div>

        <div class="features py-3">
          <h2 class="title my-3">Features and Services</h2>
          <v-layout row wrap justify-space-between>
            <v-flex xs6 md2 class="feature">
              <img src="../../public/images/happiness.png" alt="Failed to load Image">
              <p class="subheading">Simple and easy to use</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam nostrum, dolorum, vitae omnis dolor</p>
            </v-flex>

            <v-flex xs6 md2 class="feature">
              <img src="../../public/images/naira.png" alt="Failed to load Image">
              <p class="subheading">Simple and easy to use</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam nostrum, dolorum, vitae omnis dolor</p>
            </v-flex>

            <v-flex xs6 md2 class="feature">
              <img src="../../public/images/cinema.png" alt="Failed to load Image">
              <p class="subheading">Simple and easy to use</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam nostrum, dolorum, vitae omnis dolor</p>
            </v-flex>

            <v-flex xs6 md2 class="feature">
              <img src="../../public/images/speed.png" alt="Failed to load Image">
              <p class="subheading">Simple and easy to use</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam nostrum, dolorum, vitae omnis dolor</p>
            </v-flex>
          </v-layout>
        </div>

        <div class="steps pa-3 my-3">
          <h2 class="title my-3 text-xs-center">How it works</h2>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md6>
              <img src="../../public/images/step1.png" alt="">
            </v-flex>
            <v-flex xs12 md6>
              <h2 class="title mt-5 mb2 subheading">Search for an apartment</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md6>
              <h2 class="title mt-5 mb-2 subheading">Get in touch with the owner</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
              </p>
            </v-flex>
            <v-flex xs12 md6>
              <img src="../../public/images/step2.png" alt="">
            </v-flex>
          </v-layout>
        </div>

        <div class="create-listing">
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md4>
              <img src="../../public/images/apartment.jpg" alt="">
            </v-flex>
            <v-flex xs12 md7>
              <h2 class="title my-3">Own a house? Create a listing</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam soluta placeat autem, accusamus
              </p>
              <v-btn class="primary mx-0">Create a Listing</v-btn>
            </v-flex>
          </v-layout>
        </div>
    </v-container>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import ReviewPopup from '@/components/ReviewPopup';
import axios from 'axios';
  export default {
    data(){
      return{
        features: [
          {img: '../../public/images/happiness.png', title: 'Simple and easy to use', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
          {img: '../../public/images/naira.png', title: 'Affordable', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
          {img: '../../public/images/cinema.png', title: 'Reach more audience', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
          {img: '../../public/images/speed.png', title: 'Fast', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
        ]
      }
    },
    computed: {
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
      ReviewPopup
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

.cities{
  text-align: center;
}
.city img{
  width: 100%;
  height: 80%;
}

.features{
  text-align: center;
}

.feature img{
  width: 50%;
  display: block;
  margin: auto;
 }

.about{
  background-color: rgba(97, 135, 230, 0.082);
}

.steps{
  background-color: #F6F8FD;
}

.steps img{
  width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.create-listing img{
  width: 100%;
}
</style>
