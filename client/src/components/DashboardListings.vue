<template>
    <div class="listings">
        <v-container>
            <h1 class="title mb-4">View all submitted listings</h1>

            <Listing v-show="listings.length>0" v-for="listing in listings" :listing="listing" :key="listing.id" />
            <v-card class="py-5" height="400px" v-show="listings.length === 0">
                <img class="empty-icon" src="../../public/images/box.png">
                <v-card-text>
                    <p class="title text-xs-center">There are no current listings</p>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import Listing from '@/components/Listing.vue';
import axios from 'axios';
export default {
    components: {
        Listing,
    },
    computed: {
        listings(){
            return this.$store.state.listings
        }
    },
    created(){
        this.$store.dispatch('getListings');
    }
}
</script>

<style scoped>
.listings{
    width: 100%;
}
.empty-icon{
    display: block;
    margin: auto;
}
</style>

