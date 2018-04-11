import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === id
        }) >= 0
      ) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetupId === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase
        .database()
        .ref('/users/' + user.id)
        .child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', { id: payload, fbKey: data.key })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase
        .database()
        .ref('/users/' + user.id + '/registrations/')
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
            registeredMeetups: [],
            fbKeys: {}
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
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('/users/' + getters.user.id + '/registrations/')
        .once('value')
        .then(data => {
          const dataReceived = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in dataReceived) {
            registeredMeetups.push(dataReceived[key])
            swappedPairs[dataReceived[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}
