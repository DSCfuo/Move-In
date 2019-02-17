<template>
    <v-card class="pa-3 mb-2">
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
    </v-card>
</template>

<script>
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/apartments'
export default {
    props: ['listing'],
    data(){
        return {

        }
    },
    methods: {
        removeListingFromDB(){
            axios.delete(`http://localhost:3000/api/listings/${this.listing.id}`)
                .then((res) => {
                    console.log("Deleted listing", res);
                })
                .catch(err => {
                    console.log('An error occured trying to remove listing from db');
                })
        },
        approveListing(){
            console.log("Approving listing");
            console.log(this.listing)
            const token = localStorage.getItem('token')
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: {
                        address: this.listing.address,
                        apartmentType: this.listing.apartmenttype,
                        location: this.listing.location,
                        price: this.listing.price,
                        status: this.listing.status,
                        ownerName: this.listing.owner_name,
                        ownerEmail: this.listing.owner_email,
                        ownerPhone: this.listing.owner_phone,
                        description: this.listing.description
                    },
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
