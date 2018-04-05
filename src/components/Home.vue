<template>
<v-container>
<v-layout row wrap class="mb-2">
<v-flex xs12 sm6 class="text-sm-right text-xs-center">
<v-btn large router to="/meetups" class="info teal darken-1">Explore Meetups</v-btn>
</v-flex>
<v-flex xs12 sm6 class="text-sm-left text-xs-center">
<v-btn large router to="/meetup/new" class="info teal darken-1">Organize Meetup</v-btn>
</v-flex>
</v-layout>
<v-layout row wrap>
  <v-flex xs12>
  <v-carousel style="cursor: pointer;">
    <v-carousel-item v-for="(item,i) in meetups" :src="item.imageURL" :key="i" 
    @click.native="onLoadMeetup(item.id)">
    <div class="title">
      {{item.title}}
    </div>
    </v-carousel-item>
  </v-carousel>
  </v-flex>
</v-layout>

  <v-layout row wrap class="mt-2">
<v-flex xs12 class="text-xs-center mx-auto">
  <div><p>Join our Meetups!</p></div>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 15px;
}
</style>
