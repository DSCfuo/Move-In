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
                    <v-btn class="primary ma-0">
                        Approve
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['listing'],
    data(){
        return {

        }
    }
}
</script>
