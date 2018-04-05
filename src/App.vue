<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-tile router to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="teal darken-1" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">DevMeetups</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link"><v-icon left>{{item.icon}}</v-icon>{{item.title}}</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout
            justify-center
            align-center
          >
            <v-flex text-xs-center>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-footer color="teal darken-1" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'lock_open', title: 'Sign up', link: '/signup' },
        { icon: 'face', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>
