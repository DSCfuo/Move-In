<template>
    <v-card class="house ma-3">
          <v-img
          class="white--text"
          height="200px"
          :src="require('../../public/images/lagos.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline primary white--text pa-2">{{status}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-text>
          <div>
            <div class="primary-info">
                <p class="title">N{{house.price}}</p>
                <p>{{house.address}}</p>
            </div>
            <p>{{house.apartmenttype}}</p>
            <p>{{house.description}}</p>
          </div>
        </v-card-text>
        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>email</v-icon>
                <span>Send mail</span>
            </v-btn>
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>phone</v-icon>
                <span>Call</span>
            </v-btn>
        </v-card-actions>
        </v-card>
</template>

<script>
export default {
    props: ['house'],
    computed: {
        status(){
            console.log("House status", this.house.status)
            if(this.house.status === 1){
                return 'Available'
            }else if(this.house.status === 2){
                return 'Booked'
            }else{
                return 'Unavailable'
            }
        }
    }
}
</script>

<style scoped>
.primary-info{
    display: flex;
    justify-content: space-between
}
</style>
