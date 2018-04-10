<template>
  <v-dialog
    v-model="registerDialog"
    scrollable
    persistent :overlay="false"
    transition="dialog-transition"
    max-width= "350px"
  >
    <v-btn accent slot="activator" class="teal--text text--darken-2">{{userIsRegistered ? 'Unregister' : 'Register'}}</v-btn>
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              <h2 class="teal--text text--darken-2" v-if="userIsRegistered">Unregister from Meetup?</h2>
              <h2 class="teal--text text--darken-2" v-else>Register for Meetup?</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
              <v-card-text>
                  <p>You can always change your decision later on.</p>           
              </v-card-text>

          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
                  <v-btn class="red--text text--darken-1" flat @click.native="registerDialog=false">Cancel</v-btn>
                  <v-btn class="teal--text text--darken-1" flat @click.native="onAgree">Confirm</v-btn>      
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data() {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      )
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
      this.registerDialog = false
    }
  }
}
</script>
