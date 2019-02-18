<template>
    <nav>
        <v-toolbar class="white">
            <v-toolbar-title>
                <v-icon class="primary--text" left>home</v-icon>
                <router-link to="/">
                    <span class="font-weight-light">Move</span>
                    <span>In</span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat router to="/" class="text-capitalize">Home</v-btn>
                <v-btn flat router to="/apartments" class="text-capitalize">Apartments</v-btn>
                <v-btn flat router to="/new_listing" class="text-capitalize">Create a listing</v-btn>
                <v-btn flat router to="/contact" class="text-capitalize">Contact Us</v-btn>
        </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style scoped>
a{
    text-decoration: none;
}
</style>

