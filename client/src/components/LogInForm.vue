<template>
  <v-form class="login-form my-4" ref="loginForm">
    <v-container>
      <v-card class="pa-5">
      <p class="red--text" v-if="loginError">{{loginError}}</p>
      <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              clearable
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
            v-model="password"
            :append-icon="password_show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="password_show ? 'text' : 'password'"
            label="Password"
            @click:append="password_show = !password_show"
          ></v-text-field>
          </v-flex>

        </v-layout>
        <v-btn class="primary mx-0" @click="login" :loading="loading">
          <span>Log In</span>
        </v-btn>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';
const apiUrl = '/api/admin/login';

  export default {
    data () {
      return {
        email: '',
        emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        password_show: false,
        password: '',
        rules: {
          required: value => !!value || 'Please enter your password',
        },
        loginError: '',
        loading: false
      }
    },
    methods: {
      login(){
        if(this.$refs.loginForm.validate()){
          this.loading = true;
          axios.post(apiUrl, {
            email: this.email,
            password: this.password,
          })
          .then(res => {
            this.loading = false;
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('admin', JSON.stringify(res.data.admin));
            this.$router.push('/admin/dashboard')
          })
          .catch(err => {
            this.loading = false;
            console.log("An error occured", err)
            if(err.message === 'Network Error'){
              this.loginError = "Failed to connect to server";
              return 
            }
            this.loginError = err.response.data.message
          })
        }
      }
    }
  }
</script>

<style scoped>
.login-form{
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
