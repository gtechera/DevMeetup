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
import EditMeetupDialog from './components/Meetup/Edit/EditMeetupDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

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

Vue.component('app-edit-meetup-dialog', EditMeetupDialog)

Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)

Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)

Vue.component('app-meetup-register-dialog', RegisterDialog)

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
      storageBucket: 'gs://gt-devmeetup.appspot.com',
      messagingSenderId: '33337102133'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
