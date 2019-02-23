<template>
  <v-footer class="pa-3 footer" dark height="auto">
      <v-container>
        <v-layout row justify-space-between="">
          <v-flex xs12 md3>
            <ul>
                <li>MoveIn</li>
                <li><v-icon left small>location_on</v-icon>1234, Yenagoa, Bayelsa State, NG.</li>
                <li><v-icon left small>email</v-icon>hello@movein.com</li>
                <li><v-icon left small>phone</v-icon>+234 703 036 7526</li>
            </ul>
          </v-flex>

          <v-flex xs12 md3>
            <ul>
                <li><router-link to="#about">About Us</router-link></li>
                <li><router-link to="/contact">Contact Us</router-link></li>
                <li><router-link to="/">FAQs</router-link></li>
                <li><router-link to="/">Terms and Policies</router-link></li>
            </ul>
          </v-flex>

          <v-flex xs12 md4>
            <p>Subscribe to our news letter</p>
            <p v-if="newsletter_message" class="primary--text">{{newsletter_message}}</p>
            <v-form ref="newsletter_subscription">
                <v-layout row justify-space-between>
                    <v-flex xs8>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            solo
                            light
                            ></v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-btn class="primary py-2" text-xs-right @click="subscribe">Subscribe</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
          </v-flex>
      </v-layout>
      </v-container>
  </v-footer>
</template>

<script>
import axios from 'axios';
const apiUrl = '/api/newsletter';
export default {
    data(){
        return {
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            newsletter_message: '',
        }
    },
    methods: {
        subscribe(){
            if(this.$refs.newsletter_subscription.validate()){
                axios.post(apiUrl, {
                    email: this.email,
                })
                .then(res => {
                    console.log('Server response', res.data.message)
                    this.newsletter_message = res.data.message
                })
                .catch(err => {
                    console.log(err.response);
                    this.newsletter_message = err.response.data.message
                })
            }
        }
    }
}
</script>

.<style scoped>
.footer ul{
    list-style-type: none;
}
</style>
