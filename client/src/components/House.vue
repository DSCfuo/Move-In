<template>
    <v-card class="house ma-3">
          <v-img
          class="white--text"
          height="200px"
          :src="require('../../public/images/lagos.jpg')"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline primary white--text pa-2">Available</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <p class="title">250,000</p>
            <v-layout row justify-space-between="">
                <v-flex xs6>
                    <span class="grey--text">Lekki Phase 1</span>
                </v-flex>
                <v-flex xs6>
                    <span class="grey--text">1 Bedroom flat</span>
                </v-flex>
            </v-layout>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati laboriosam, animi reiciendis deleniti, voluptatem
               culpa consequuntur quis sint.</p>
          </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>email</v-icon>
                <span>Send mail</span>
            </v-btn>
            <v-btn flat color="primary">
                <v-icon class="primary--text" left>phone</v-icon>
                <span>Call</span>
            </v-btn>
        </v-card-actions>
        </v-card>
</template>
