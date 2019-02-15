<template>
    <div class="add-apartment">
        <v-container>
            <v-form ref="addApartmentForm">
                <v-card>
                    <v-card-title>
                        <h1 class="title">Add apartment</h1>
                    </v-card-title>
                    <v-card-text>
                        <p v-if="addApartmentMessage">{{addApartmentMessage}}</p>
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
                        <v-btn class="primary" @click="addApartment">Add apartment</v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/apartments';

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
            addApartmentMessage: ''
        }
    },
    methods: {
        clearInputFields(){
            this.address = '';
            this.apartment = '';
            this.location = '';
            this.price = '';
            this.owner.name = '',
            this.owner.email = '';
            this.owner.phone = '';
            this.description = '';
        },
        addApartment(){
            if(this.$refs.addApartmentForm.validate()){
                console.log("Submitting",this.address, this.apartment, this.location, this.price, this.owner.name, this.owner.email, this.owner.phone,
                this.description);
                const token = localStorage.getItem('token')
                axios.post(apiUrl, {
                    address: this.address,
                    apartmentType: this.apartment,
                    location: this.location,
                    price: this.price,
                    ownerName: this.owner.name,
                    ownerEmail: this.owner.email,
                    ownerPhone: this.owner.phone,
                    description: this.description
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token,
                    }
                })
                .then(res => {
                    this.addApartmentMessage = res.data.message;
                    this.clearInputFields()
                })
                .catch(err => {
                    this.addApartmentMessage = res.data.message
                    console.log("Oh no an error occured", err)
                })
            }
        }
    }
}
</script>

<style scoped>
.add-apartment{
    width: 100%
}
</style>
