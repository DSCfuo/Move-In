<template>
    <v-card class="house ma-3">
          <v-img
          class="white--text"
          height="200px"
          :src="house.image_url"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span :class="['headline', status, 'white--text', 'pa-2']">{{status}}</span>
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
        <v-card-actions v-if="this.$route.name === 'search'">
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>email</v-icon>
                <span>Send mail</span>
            </v-btn>
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>phone</v-icon>
                <span>Call</span>
            </v-btn>
        </v-card-actions>
        <v-card-actions v-if="this.$route.name === 'dashboardSearch'">
            <v-btn flat color="primary" @click="editApartment">
                <v-icon class="primary--text" left>edit</v-icon>
                <span>Edit</span>
            </v-btn>
            <v-btn flat color="red" @click="removeApartment">
                <v-icon class="red--text" left>delete</v-icon>
                <span>Remove</span>
            </v-btn>
        </v-card-actions>
        </v-card>
</template>

<script>
import axios from 'axios';
export default {
    props: {house:{type: Object}, modify: {type: Boolean}},
    methods: {
        editApartment(){
            this.$router.push(`/admin/dashboard/edit_apartment/${this.house.id}`)
        },
        removeApartment(){
            const token = localStorage.getItem('token');
            const apiUrl = `/api/apartments/${this.house.id}`
            axios.delete(apiUrl, {
                headers: {
                    'authorization': token,
                }
            })
            .then((res) => {
                console.log('Successfully removed apartment');
                this.$store.commit('removeApartment', this.house.id)
            })
        }
    },
    computed: {
        status(){
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

.Available{
    background-color: #6186E6;
}

.Booked{
    background-color: orange;
}

.Unavailable{
    background-color: red;
}
</style>
