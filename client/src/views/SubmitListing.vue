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
                        <v-btn class="primary" @click="submitListing" :loading="loading">Submit Listing</v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import Header from '@/components/Header';
import axios from 'axios';
const apiUrl = 'api/listings'
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
             imageName: 'No image selected yet',
            imageUrl: '',
            imageFile: '',
            submitListingMessage: '',
            loading: false,
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click()
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
        submitListing(){
            if(this.$refs.submitListingForm.validate()){
                this.loading = true;
                let formData = new FormData();
                formData.append('apartmentImg', this.imageFile);
                formData.append('address', this.address);
                formData.append('apartmentType', this.apartment);
                formData.append('location', this.location);
                formData.append('price', this.price);
                formData.append('status', 1);
                formData.append('ownerName', this.owner.name);
                formData.append('ownerEmail', this.owner.email);
                formData.append('ownerPhone', this.owner.phone);
                formData.append('description', this.description);
                axios({
                    method: 'post',
                    url: apiUrl,
                    data: formData,
                })
                .then(res => {
                    this.loading = false;
                    this.submitListingMessage = res.data.message;
                    this.$refs.submitListingForm.reset();
                })
                .catch(err => {
                    this.loading = false;
                    this.submitListingMessage = err.response.data.message;
                    console.log("An error occured", err)
                })
            }
        }
    },
    components: {
        Header,
    }
}
</script>

<style scoped>
.apartment-img{
    display: block;
    width: 40%;
    max-height: 250px;
    margin: 0 auto 10px auto;
}
</style>
