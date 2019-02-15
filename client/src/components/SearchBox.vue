<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-form v-model="valid" ref="form">
                    <v-container>
                    <v-layout>
                        <v-flex
                        xs12
                        md4
                        >
                        <v-text-field
                            v-model="location"
                            label="Enter location"
                            clearable
                            required
                            prepend-icon="location_on"
                            :rules="locationRules"
                        ></v-text-field>
                        </v-flex>

                        <v-flex
                        xs12
                        md3
                        >
                        <v-text-field
                            v-model="budget"
                            label="Your Budget"
                            required
                            :rules="budgetRules"
                            type="number"
                            prefix="N"
                        ></v-text-field>
                        </v-flex>

                        <v-flex
                        xs12
                        md3
                        >
                         <v-select
                            :items="apartmentType"
                            v-model="apartment"
                            label="Apartment Type"
                            prepend-icon="home"
                            ></v-select>
                        </v-flex>

                        <v-flex
                        xs12
                        md2
                        >
                         <v-btn class="primary" @click="submit">Find apartment</v-btn>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    props: ['location', 'budget', 'apartment', 'page'],
    data: () => ({
      valid: false,
      apartmentType: ['Office', 'Shop', 'Self contain',
                      '1 Bedroom apartment', '2 Bedroom apartment',
                      '3 Bedroom apartment', 'Duplex'],
      budgetRules: [
          value  => value >= 20000 || 'Budget cannot be less than 20,000 naira'
      ],
      locationRules: [
          value => value.length >= 3 || 'Location must be at least three characters long'
      ]
    }),
    methods: {
        search(){
            this.$store.dispatch('searchApartment', {location: this.location,
                                budget: this.budget, 
                                apartmentType: this.apartment? this.apartment: 'any'})
        },
        submit(){
            if(this.$refs.form.validate()){
                this.$store.commit('searchQuery', {location: this.location,
                                                   budget: this.budget,
                                                   apartmentType: this.apartment? this.apartment : 'any'})
                this.search()
                this.$router.push({
                    name: this.page,
                })
            }
        }
    },
    created(){
        if(this.location && this.budget){
            this.search()
        }else{
            this.$store.dispatch('initialSearch')
        }
    }
  }
</script>