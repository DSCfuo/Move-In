<template>
<div class="dashboard">
<v-navigation-drawer app permanent>
    <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://pbs.twimg.com/profile_images/1049218956643459072/PHtCoqZN_400x400.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        router :to="item.route"
      >
        <v-list-tile-action >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <router-view></router-view>
</div>
  
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'All apartments', icon: 'home', route: '/admin/dashboard' },
          { title: 'Add Apartment', icon: 'add', route: '/admin/dashboard/add_apartment' },
          { title: 'New Listings', icon: 'list', route: '/admin/dashboard/listings' }
        ],
        right: null
      }
    },
    methods: {
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        this.$router.push('/')
      }
    },
    computed: {
      user(){
        return JSON.parse(localStorage.getItem('admin'))
      }
    }
  }
</script>

<style scoped>
.dashboard{
    display: flex
}
</style>
