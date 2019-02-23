<template>
    <v-dialog max-width="600px">
        <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="#FD7C88"
              slot="activator"
            >
              <v-icon>rate_review</v-icon>
            </v-btn>
        <v-card class="pa-3 rating">
            <v-card-title>
                <h2 class="title text-xs-center">Tell us what you think about our service</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="reviewForm">
                    <p v-show="result" class="primary--text">{{result}}</p>
                    <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                        ></v-rating>
                    
                    <v-textarea
                        label="Tell us what you think"
                        v-model="review"
                        required
                        ></v-textarea>
                    
                    <v-btn class="primary mx-0" @click="submitReview" :loading="loading">
                        Submit
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
const apiUrl = 'api/reviews';

export default {
    data(){
        return{
            rating: 0,
            review: '',
            result: '',
            loading: false,
        }
    },
    methods: {
        submitReview(){
            if(this.$refs.reviewForm.validate()){
                this.loading = true
                this.result = ''
                axios.post(apiUrl, {
                    rating: this.rating,
                    review: this.review
                })
                .then(res => {
                    this.loading = false;
                    this.$refs.reviewForm.reset()
                    this.result = res.data.message
                })
                .catch(err => {
                    this.loading = false;
                    this.$refs.reviewForm.reset()
                    this.result = err.message
                    console.log(err)
                })
            }
        }
    }
}
</script>

