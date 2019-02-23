<template>
    <v-card class="pa-3 mb-2">
        <v-layout row>
            <v-flex xs12 md3>
                <img class="listing-img" :src="listing.image_url" alt="Failed to load image">
            </v-flex>
            <v-flex xs12 md9>
                <v-card-text>
                    <h1 class="subheading">Apartment details</h1>
                    <v-layout row wrap>
                        <v-flex xs6 md3>
                            <p>{{listing.address}}, {{listing.location}}</p>
                        </v-flex>
                        <v-flex xs6 md3>
                            <p>{{listing.price}}</p>
                        </v-flex>
                        <v-flex xs2 md3>
                            <p>{{listing.apartmenttype}}</p>
                        </v-flex>
                        <v-flex xs2 md3>
                            <p>{{listing.created_at}}</p>
                        </v-flex>
                    </v-layout>
                    <h1 class="subheading">Owner details</h1>
                    <v-layout row wrap>
                        <v-flex xs6 md3>
                            <p>{{listing.owner_name}}</p>
                        </v-flex>
                        <v-flex xs6 md3>
                            <p>{{listing.owner_email}}</p>
                        </v-flex>
                        <v-flex xs2 md3>
                            <p>{{listing.owner_phone}}</p>
                        </v-flex>
                        <v-flex xs2 md3>
                            <v-btn color="primary" @click="approveListing">
                                Approve
                            </v-btn>
                            <v-btn dark color="red" @click="rejectListing">
                                Reject
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import axios from 'axios';
const apiUrl = '/api/apartments/approve_listing'
export default {
    props: ['listing'],
    data(){
        return {

        }
    },
    methods: {
        removeListingFromDB(){
            axios.delete(`/api/listings/${this.listing.id}`)
                .then((res) => {
                    console.log("Deleted listing", res);
                })
                .catch(err => {
                    console.log('An error occured trying to remove listing from db');
                })
        },
        approveListing(){
            const token = localStorage.getItem('token');
            let formData = new FormData();
            formData.append('image_url', this.listing.image_url);
            formData.append('image_id', this.listing.image_id)
            formData.append('address', this.listing.address);
            formData.append('apartmentType', this.listing.apartmenttype);
            formData.append('location', this.listing.location);
            formData.append('price', this.listing.price);
            formData.append('status', this.listing.status);
            formData.append('ownerName', this.listing.owner_name);
            formData.append('ownerEmail', this.listing.owner_email);
            formData.append('ownerPhone', this.listing.owner_phone);
            formData.append('description', this.listing.description);
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: formData,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token,
                    }
                })
                .then(res => {
                    //Remove listing from list of listings in db and store
                    this.removeListingFromDB();
                    this.$store.commit('removeListing', this.listing.id);
                    // this.clearInputFields()
                })
                .catch(err => {
                    // this.addApartmentMessage = res.data.message
                    console.log("An error occured trying to approve listing", err)
                })

        },
        rejectListing(){
            console.log("Rejecting listing")
            this.removeListingFromDB();
            this.$store.commit('removeListing', this.listing.id);
        }
    }
}
</script>

<style scoped>
.listing-img{
    width: 100%;
    max-height: 250px;
}
</style>

