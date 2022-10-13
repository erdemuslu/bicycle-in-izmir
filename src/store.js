import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stations: [],
    weatherData: [],
    todayTemp: [],
    items: []
  },
  mutations: {
    getDatas(state) {
          axios.get("https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar")
            .then((response) => {
              this.items = response.data.stations.filter((item,index,array) =>{
                if(item.Kapasite == "0"){
                    return false
                  }
                  item.Kapasite = parseInt(item.Kapasite)
                  return state.stations = this.items;
              })
              Array.prototype.map.call(this.$store.state.stations, (item) => {
                this.totalBicycles += item.Kapasite;
                this.totalFreeBicycles += (item.Kapasite-item.BisikletSayisi);
              })
            });
       axios.get("https://api.citybik.esv2/networks/baksi-bisim")
       .then((response) => {
         state.stations = response.data.stations;
       })
       .catch(error => {
         console.log(error)
       })
     }
   },
   actions: {
     getDatas: ({ commit }) => commit("getDatas")
   }
})
