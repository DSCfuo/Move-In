<template>
  <v-form class="login-form" ref="loginForm">
    <v-container>
      <v-card class="pa-5">
      <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
            v-model="password"
            :append-icon="password_show ? 'visibility_off' : 'visibility'"
            :rules="[rules.required]"
            :type="password_show ? 'text' : 'password'"
            label="Enter password"
            @click:append="show1 = !show1"
          ></v-text-field>
          </v-flex>

        </v-layout>
        <v-btn class="primary mx-0" @click="login">
          <span>Log In</span>
        </v-btn>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
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
        }
      }
    },
    methods: {
      login(){
        if(this.$refs.loginForm.validate()){
          console.log('Logging ing')
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
