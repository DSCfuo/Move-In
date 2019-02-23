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
                        <img class="apartment-img" :src="imageUrl" v-if="imageUrl"/>
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
                        <v-btn class="primary" @click="addApartment" :loading="loading">Submit</v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
let apiUrl = '/api/apartments';

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
            addApartmentMessage: '',
            loading: false,
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
					this.imageFile = files[0] 
				})
			} else {
				this.imageName = 'No image selected yet'
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
        addApartment(){
            if(this.$refs.addApartmentForm.validate()){
                if(this.imageFile === '' && this.editMode === false){
                    this.addApartmentMessage = "Please select a file"
                    return;
                }
                this.loading = true;
                const token = localStorage.getItem('token');
                let httpMethod = 'post';
                if(this.editMode){
                    httpMethod = 'put';
                    apiUrl = apiUrl+`/${this.$route.params.id}`
                }
                let formData = new FormData();
                formData.append('apartmentImg', this.imageFile);
                formData.append('address', this.address);
                formData.append('apartmentType', this.apartment);
                formData.append('location', this.location);
                formData.append('price', this.price);
                formData.append('status', this.status);
                formData.append('ownerName', this.owner.name);
                formData.append('ownerEmail', this.owner.email);
                formData.append('ownerPhone', this.owner.phone);
                formData.append('description', this.description);

                axios({
                    method: httpMethod,
                    url: apiUrl,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': token,
                    }
                    
                })
                .then(res => {
                    this.loading = false;
                    this.$refs.addApartmentForm.reset();
                    this.addApartmentMessage = res.data.message;
                    this.$refs.addApartmentForm.reset();
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                })
                .catch(err => {
                    this.loading = false;
                    this.addApartmentMessage = err.response.data.message
                    console.log("An error occured", err)
                })
            }
        }
    },
    created(){
        if(this.$route.name === 'addApartment'){
            this.pageTitle = 'Add Apartment'
        }else if(this.$route.name === 'editApartment'){
            this.editMode = true;
            this.pageTitle = 'Edit Apartment'
            axios.get(apiUrl+`/${this.$route.params.id}`)
            .then(res => {
                let apartment = res.data.data;
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
                console.log('An error occured!', err)
            })
        }
    }
}
</script>

<style scoped>
.add-apartment{
    width: 100%
}

.apartment-img{
    display: block;
    width: 50%;
    max-height: 250px;
    margin: 0 auto 10px auto;
}
</style>
