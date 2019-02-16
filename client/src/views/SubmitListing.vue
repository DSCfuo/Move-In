<template>
    <div class="add-apartment">
        <Header headerTitle = "Submit Listing" />
        <v-container>
            <v-form ref="submitListingForm">
                <v-card>
                    <v-card-title>
                        <h1 class="title">Submit a listing</h1>
                    </v-card-title>
                    <v-card-text>
                        <p class="primary--text" v-if="submitListingMessage">{{submitListingMessage}}</p>
                        <v-layout row wrap justify-space-between>
                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                    v-model="address"
                                    label="Enter address"
                                    clearable
                                    required
                                    :rules="addressRules"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-select
                                    :items="apartmentType"
                                    v-model="apartment"
                                    label="Apartment Type"
                                    ></v-select>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                    v-model="location"
                                    label="Enter location"
                                    clearable
                                    required
                                    :rules="addressRules"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                    v-model="price"
                                    label="Price"
                                    required
                                    :rules="priceRules"
                                    type="number"
                                    prefix="N"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                    v-model="owner.name"
                                    label="Owner name"
                                    clearable
                                    required
                                    :rules="addressRules"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                v-model="owner.email"
                                :rules="emailRules"
                                label="Owner email"
                                required
                                clearable
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 md6 class="px-2">
                                <v-text-field
                                    v-model="owner.phone"
                                    label="Owner phone"
                                    clearable
                                    required
                                    :rules="phoneRules"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 class="px-2">
                                <v-textarea
                                    label="Apartment description"
                                    v-model="description"
                                    required
                                    ></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-btn class="primary" @click="submitListing">Submit Listing</v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import Header from '@/components/Header';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/listings'
export default {
    data(){
        return {
            address: '',
            addressRules: [
                value => value.length >= 3 || 'Address must be at least three characters long'
            ],
            apartment: '',
            apartmentType: ['Office', 'Shop', 'Self contain',
                      '1 Bedroom apartment', '2 Bedroom apartment',
                      '3 Bedroom apartment', 'Duplex'],
            location:'',
            price: '',
            priceRules: [
                value  => value >= 20000 || 'Budget cannot be less than 20,000 naira'
            ],
            owner: {
                name: '',
                email: '',
                phone:''
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            phoneRules: [
            ],
            description:'',
            submitListingMessage: ''
        }
    },
    methods: {
        submitListing(){
            if(this.$refs.submitListingForm.validate()){
                console.log("About to submit listing")
                axios({
                    method: 'post',
                    url: apiUrl,
                    data: {
                        address: this.address,
                        apartmentType: this.apartment,
                        location: this.location,
                        price: this.price,
                        status: 1,
                        ownerName: this.owner.name,
                        ownerEmail: this.owner.email,
                        ownerPhone: this.owner.phone,
                        description: this.description
                    }
                })
                .then(res => {
                    this.submitListingMessage = res.data.message;
                    // this.clearInputFields()
                })
                .catch(err => {
                    this.submitListingMessage = res.data.message
                    console.log("Oh no an error occured", err)
                })
            }
        }
    },
    components: {
        Header,
    }
}
</script>

