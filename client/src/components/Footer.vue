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
            <v-form>
                <v-layout row justify-space-between>
                    <v-flex xs6>
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            solo
                            light
                            ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn class="primary py-2" text-xs-right>Subscribe</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
          </v-flex>
      </v-layout>
      </v-container>
  </v-footer>
</template>

.<style scoped>
.footer ul{
    list-style-type: none;
}
</style>
