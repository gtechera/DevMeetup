import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import colors from 'vuetify/es5/util/colors'
import DateFilter from './filter/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBxMB0qTySZqkNXhCL25_r3mcqJaclUc7g',
      authDomain: 'gt-devmeetup.firebaseapp.com',
      databaseURL: 'https://gt-devmeetup.firebaseio.com',
      projectId: 'gt-devmeetup',
      storageBucket: 'gt-devmeetup.appspot.com',
      messagingSenderId: '33337102133'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
