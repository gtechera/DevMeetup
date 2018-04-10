<template>
  <v-dialog
    v-model="editDialog"
    scrollable
    persistent :overlay="false"
    max-width="350px"
    transition="dialog-transition"
  >
    <v-btn accent slot="activator">Edit Date</v-btn>
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              <h2 class="teal--text text--darken-2">Edit Meetup Date</h2> 
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
              <v-date-picker 
              v-model="editedDate" 
              style="width: 100%"
              actions
              show-current=false>
              </v-date-picker>
              <v-btn color="teal--text" flat @click.native="editDialog=false">Close</v-btn>
              <v-btn color="teal--text" flat @click.native="onSaveChanges">Save</v-btn>
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
      editedDate: this.meetup.date
    }
  },
  methods: {
    onSaveChanges() {
      if (this.editedDate === null) {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: this.editedDate
      })
    }
  }
}
</script>
