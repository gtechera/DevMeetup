<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <h2 class="teal--text text--darken-2">{{meetup.title}}</h2>
          <template v-if="userIsCreator">
            <v-spacer></v-spacer>
            <app-edit-meetup-dialog :meetup="meetup"></app-edit-meetup-dialog>
          </template>
        </v-card-title>
        <v-card-media
          :src="meetup.imageURL"
          height="400px">
        </v-card-media>
        <v-card-text>
          <div class="pb-2 teal--text text--darken-2 text-sm-left">{{meetup.date | date}} at {{meetup.time}} hrs. - {{meetup.location}}</div>
          <div class="text-sm-left">
          <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
          <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
          </div> 
          <div class="text-sm-left">{{meetup.description}}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>
