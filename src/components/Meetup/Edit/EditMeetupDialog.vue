<template>
  <v-dialog
    v-model="editDialog"
    scrollable
    persistent :overlay="false"
    max-width="350px"
    transition="dialog-transition"
  >
    <v-btn fab accent slot="activator"><v-icon>edit</v-icon></v-btn>
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              <h2 class="teal--text text--darken-2">Edit Meetup</h2> 
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
              name="Title"
              label="Title"
              id="title"
              v-model="editedTitle"
              required
            ></v-text-field>
            <v-text-field
              name="Location"
              label="Location"
              id="location"
              v-model="editedLocation"
              required
            ></v-text-field>
             <v-text-field
              name="Description"
              label="Description"
              id="description"
              v-model="editedDescription"
              multi-line
              required
            ></v-text-field>  
            </v-card-text>
          </v-flex>
        </v-layout>
       <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="teal--text text--darken-2" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="teal--text text--darken-2" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editedDescription: this.meetup.description //,
      // editedDate: this.meetup.date,
      // editedTime: this.meetup.time
    }
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === '' ||
        this.editedLocation.trim() === '' ||
        this.editedDescription.trim() === '' // ||
        //this.editedDate === null ||
        //this.editedTime === null
      ) {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        location: this.editedLocation,
        description: this.editedDescription //,
        //date: this.editedDate,
        //time: this.editedTime
      })
    }
  }
}
</script>