<template>
    <div class="listings">
        <v-container>
            <h1 class="title mb-4">View all submitted listings</h1>

            <Listing v-for="listing in listings" :listing="listing" :key="listing.id" />
        </v-container>
    </div>
</template>

<script>
import Listing from '@/components/Listing.vue';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/listings';

export default {
    data(){
        return {
            listings: undefined
        }
    },
    components: {
        Listing,
    },
    created(){
        axios.get(apiUrl)
        .then(res => {
            this.listings = res.data.data
        })
        .catch(err => {
            console.log("Failed to fetch listings", err)
        })
    }
}
</script>

<style scoped>
.listings{
    width: 100%;
}
</style>

