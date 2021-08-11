import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);
import videos from '../assets/dataVideos/videos'

const store = () => new Vuex.Store({
  state: {
    video: videos,
    activeVideo: videos[0]
  },
  getters: {
    allVideo(state){
      return state.video
    },
    activeVideo(state) {
      return state.activeVideo
    }
  },
  actions: {
  },
  mutations: {
  },


})

export default store;
