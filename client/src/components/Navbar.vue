<template>
    <nav>
        <v-toolbar class="white">
            <v-toolbar-title>
                <v-icon class="primary--text" left>home</v-icon>
                <span class="font-weight-light">Move</span>
                <span>In</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat router to="/apartment" class="text-capitalize">Apartments</v-btn>
                <v-btn flat router to="/create_listing" class="text-capitalize">Create a listing</v-btn>
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

</style>

