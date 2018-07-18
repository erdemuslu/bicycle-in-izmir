import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stations: [],
    weatherDatas: [],
    todayTemp: []
  }
  // mutations: {
  //   getDatas(state) {
  //     axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
  //     .then((response) => {
  //       state.stations = response.data.network.stations;
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  //   }
  // },
  // actions: {
  //   getDatas: ({ commit }) => commit("getDatas")
  // }
})
