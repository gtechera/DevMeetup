<template>
<v-container grid-list-xs>
  <v-layout row wrap>
    <v-flex xs12>
      <h2 class="teal--text text--darken-2">Create a New Meetup</h2>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <form @submit.prevent="onCreateMeetup">
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              name="Title"
              label="Title"
              id="title"
              v-model="title"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              name="Location"
              label="Location"
              id="location"
              v-model="location"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>        
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
             <v-text-field
              name="ImageUrl"
              label="Image URL"
              id="imageURL"
              v-model="imageURL"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <img :src="imageURL" height="200">
          </v-flex>
        </v-layout>        
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
             <v-text-field
              name="Description"
              label="Description"
              id="description"
              v-model="description"
              multi-line
              required
            ></v-text-field>
          </v-flex>
        </v-layout>  
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <h4>Pick a Date & Time</h4>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-2">
          <v-flex xs12 sm6 offset-sm3>
            <v-date-picker v-model="date" locale="es"></v-date-picker>
            <p>{{date}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-time-picker v-model="time"></v-time-picker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn class="primary" 
            :disabled="!formIsValid"
            type="submit"
            >Create Meetup</v-btn>
          </v-flex>
        </v-layout>      
      </form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      description: '',
      imageURL: '',
      date: null,
      time: null
    }
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.description !== '' &&
        this.imageURL !== '' &&
        this.date !== null &&
        this.time !== null
      )
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageURL: this.imageURL,
        date: this.date,
        time: this.time
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
