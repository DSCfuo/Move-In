<template>
    <div class="contact-us">
        <Header headerTitle="Contact Us"/>
        <v-container>
            <v-card class="pa-3">
                <v-layout row>
                    <v-flex xs12 md5>
                        <h2 class="title mb-3">Hit us up</h2>
                        <div class="contact-info pa-2" v-for="item in contactInfo" :key="item.text">
                            <v-icon small left>{{item.icon}}</v-icon>
                            <span>{{item.text}}</span>
                        </div>
                    </v-flex>
                    <v-flex xs12 md7>
                        <v-form ref="contactForm">
                            <p class="primary--text" v-if="contactFormMessage">{{contactFormMessage}}</p>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="name"
                                        label="Name"
                                        clearable
                                        required
                                        prepend-icon="person"
                                        :rules="nameRules"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                                    prepend-icon="email"
                                    clearable
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea
                                    label="Message"
                                    v-model="message"
                                    required
                                    prepend-icon="message"
                                    ></v-textarea>
                                </v-flex>

                            </v-layout>
                            <v-btn class="primary mx-0" @click="sendMessage" :loading="loading">
                                <span>Send message</span>
                            </v-btn>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import Header from '@/components/Header'
import axios from 'axios';
const apiUrl = '/api/contact';

export default {
    data(){
        return{
            name:'',
            email: '',
            message:'',
            emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
            nameRules: [
                value => value.length >= 3 || 'Name must be at least three characters long'
            ],
            contactInfo: [
                {icon: 'location_on', text: '1234 Yenagoa, Bayelsa State'},
                {icon: 'email', text: 'hello@movein.com'},
                {icon: 'phone', text: '+234 708 543 6753'}
            ],
            contactFormMessage: '',
            loading: false
        }
    },
    methods: {
        sendMessage(){
            if(this.$refs.contactForm.validate()){
                this.loading = true;
                this.contactFormMessage = '';
                axios.post(apiUrl, {
                    name: this.name,
                    email: this.email,
                    message: this.message,
                })
                .then(res => {
                    this.loading = false;
                    this.$refs.contactForm.reset()
                    this.contactFormMessage = res.data.message;
                })
                .catch(err => {
                    console.log("Couldnt send mail", err);
                    this.loading = false;
                    this.$refs.contactForm.reset()
                    this.contactFormMessage = err.response.data.message
                })
            }
        }
    },
    components: {
        Header
    }
}
</script>

