<template>
    <div class="add-apartment">
        <v-container>
            <v-form ref="addApartmentForm">
                <v-card>
                    <v-card-title>
                        <h1 class="title">{{pageTitle}}</h1>
                    </v-card-title>
                    <v-card-text>
                        <p v-if="addApartmentMessage">{{addApartmentMessage}}</p>
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
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

                             <v-flex
                                xs12
                                md6
                                class="px-2"
                                >
                                <v-select
                                    :items="statusOptions"
                                    v-model="status"
                                    label="Status"
                                    ></v-select>
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
                                <v-btn flat class="primary" @click="pickFile">
                                    <v-icon left>attach_file</v-icon>
                                    Select Apartment photo
                                </v-btn>
                                <!-- <v-text-field label="Choose apartment image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field> -->
                                <span class="ml-3">{{imageName}}</span>
                                <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/*"
                                    @change="onFilePicked"
                                >
                            </v-flex>

                            <v-flex xs12 class="px-2">
                                <v-textarea
                                    label="Apartment description"
                                    v-model="description"
                                    required
                                    ></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-btn class="primary" @click="addApartment">Submit</v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
let apiUrl = 'http://localhost:3000/api/apartments';

export default {
    data(){
        return {
            editMode: false,
            pageTitle: 'Add apartment',
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
            status: '',
            statusOptions: [{text: 'To let', value: 1},
                            {text: 'Booked', value: 2},
                            {text: 'Unavailable', value:3}],
            description:'',
            imageName: 'No image selected yet',
            imageUrl: '',
            imageFile: '',
            addApartmentMessage: ''
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = 'No image selected yet'
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
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
                if(this.imageFile === ''){
                    this.addApartmentMessage = "Please select a file"
                    return;
                }
                console.log("Submitting",this.address, this.apartment, this.location, this.price, this.owner.name, this.owner.email, this.owner.phone,
                this.description);
                const token = localStorage.getItem('token');
                let httpMethod = 'post';
                if(this.editMode){
                    httpMethod = 'put';
                    apiUrl = apiUrl+`/${this.$route.params.id}`
                }
                axios({
                    method: httpMethod,
                    url: apiUrl,
                    data: {
                        address: this.address,
                        apartmentType: this.apartment,
                        location: this.location,
                        price: this.price,
                        status: this.status,
                        ownerName: this.owner.name,
                        ownerEmail: this.owner.email,
                        ownerPhone: this.owner.phone,
                        description: this.description
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token,
                    }
                })
                .then(res => {
                    this.addApartmentMessage = res.data.message;
                    // this.clearInputFields()
                })
                .catch(err => {
                    this.addApartmentMessage = res.data.message
                    console.log("Oh no an error occured", err)
                })
            }
        }
    },
    created(){
        console.log(this.$route);
        if(this.$route.name === 'addApartment'){
            this.pageTitle = 'Add Apartment'
            console.log('Add apartment route')
        }else if(this.$route.name === 'editApartment'){
            this.editMode = true;
            this.pageTitle = 'Edit Apartment'
            axios.get(apiUrl+`/${this.$route.params.id}`)
            .then(res => {
                let apartment = res.data.data;
                console.log('Yay got single note ', res)
                this.address = apartment.address;
                this.apartment = apartment.apartmenttype;
                this.location = apartment.location;
                this.price = apartment.price;
                this.status = apartment.status;
                this.description = apartment.description;
                this.owner.name = apartment.owner.name;
                this.owner.email = apartment.owner.email;
                this.owner.phone = apartment.owner.phone
            })
            .catch(err => {
                console.log('An error occured! Shit!', err)
            })
            console.log('Edit apartment route', this.$route.params.id)
        }
    }
}
</script>

<style scoped>
.add-apartment{
    width: 100%
}
</style>
