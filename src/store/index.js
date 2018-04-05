import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageURL:
          'https://images.pexels.com/photos/40142/new-york-skyline-manhattan-hudson-40142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        id: 'asjñdfasodurfaqswer8975897',
        title: 'Meetup in New York',
        location: 'New York City Hall',
        date: '2018-07-18',
        time: '11:00',
        description:
          'This is the description of the New York meeting. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est reprehenderit, alias assumenda nihil tenetur accusantium magni omnis? Assumenda, aspernatur veniam?'
      },
      {
        imageURL:
          'https://images.pexels.com/photos/275606/pexels-photo-275606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        id: 'asjñdfasodurfaqswer897543545897',
        title: 'Meetup in Boston',
        location: 'Boston Market',
        date: '2018-08-19',
        time: '13:00',
        description:
          'This is the description of the Boston meeting. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est reprehenderit, alias assumenda nihil tenetur accusantium magni omnis? Assumenda, aspernatur veniam?'
      },
      {
        imageURL:
          'https://images.pexels.com/photos/421655/pexels-photo-421655.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        id: 'asjñdf554544asodurfaqswer8975897',
        title: 'Meetup in Miami',
        location: 'Miami Center',
        date: '2018-04-10',
        time: '15:00',
        description:
          'This is the description of the Miami meeting. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est reprehenderit, alias assumenda nihil tenetur accusantium magni omnis? Assumenda, aspernatur veniam?'
      },
      {
        imageURL:
          'https://images.pexels.com/photos/462219/pexels-photo-462219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        id: 'asjñdfasodu345987sg897rfaqswer8975897',
        title: 'Meetup in Los Angeles',
        location: 'Los Angeles Center',
        date: '2018-09-28',
        time: '08:00',
        description:
          'This is the description of the Pittsburgh meeting. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est reprehenderit, alias assumenda nihil tenetur accusantium magni omnis? Assumenda, aspernatur veniam?'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageURL: payload.imageURL,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        id: payload.id
      }
      //Reach out to Firebase and store Meetup
      commit('createMeetup', meetup)
    },
    signUpUser({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signInUser({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = { id: user.uid, registeredMeetups: [] }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
