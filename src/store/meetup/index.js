import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.time) {
        meetup.time = payload.time
      }
    }
  },
  actions: {
    loadMeetups({ commit, getters }) {
      commit('setLoading', true)
      //Reach out firebase
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            if (getters.user.id === obj[key].creatorId) {
              meetups.push({
                id: key,
                title: obj[key].title,
                location: obj[key].location,
                imageURL: obj[key].imageURL,
                description: obj[key].description,
                date: obj[key].date,
                time: obj[key].time,
                creatorId: obj[key].creatorId
              })
            }
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      }
      //Reach out to Firebase and store Meetup
      let key
      let imageUrl
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          //Create meetup in store
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase
            .storage()
            .ref('meetups/' + key + '.' + ext)
            .put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageURL: imageUrl })
        })
        .then(() => {
          commit('createMeetup', { ...meetup, imageURL: imageUrl, id: key })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      if (payload.time) {
        updateObj.time = payload.time
      }
      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    }
  }
}
