<template>
    <div class="home">
        <div class="home-block home-block--left">
            <img :src=mainIcon alt="main-icon">
        </div>
        <div class="home-block home-block--right">
            <div>
                <p>Bisim'in sağladığı bisiklet kiralama hizmetine ait istasyonlardaki doluluk oranını görebilirsiniz.</p>
                <router-link to="/list" class="button">İstasyonları Gör</router-link>
                <h1>İzmir'de hava {{ todayTemp }} derece.</h1>
                <h4 v-if="todayTemp > 24">Bisiklet'e binmek icin harika bir gun!</h4>
                <ul class="weather">
                    <li class="weather__block" v-for="(item, index) in weatherData" v-bind:key="index">
                        <h3>{{ moment(item.dt) }}</h3>
                        <img :src="weatherIcons[item.weather[0].main]" :alt="item.weather[0].description">
                        <span>{{ Math.round(item.temp.day) }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import axios from 'axios';
    import moment from 'moment';
    import 'moment/locale/tr';
    import mainIcon from '../assets/main-icon.svg';
    import clear from '../assets/clear.svg';
    import rain from '../assets/rain.svg';

    export default {
        name: "Home",
        data() {
            return {
                pageName: "Home",
                mainIcon: mainIcon,
                totalBicycles: 0,
                totalFreeBicycles: 0,
                weatherIcons: {
                    "Clear": clear,
                    "Rain": rain
                },
                weatherData: this.$store.state.weatherData,
                todayTemp: null
            }
        },
        computed: {
            stations() {
                return this.$store.state.stations
            }
        },
        methods: {
            moment: function(date) {
                date = date * 1000;
                return moment(date).locale('tr').format('dddd');
            }
        },
        created() {
            // baksi api
            let stationsArr = []
            axios.get("https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar")
            .then((response) => {
                this.items = response.data.stations.filter((item,index,array) =>{
                    if(item.Kapasite == "0"){
                        return false
                    }
                    item.Kapasite = parseInt(item.Kapasite)
                    stationsArr.push(item)
                })
                this.$store.state.stations = stationsArr;
                Array.prototype.map.call(this.$store.state.stations, (item) => {
                    this.totalBicycles += item.Kapasite;
                    this.totalFreeBicycles += (item.Kapasite-item.BisikletSayisi);
                })
            });
            // weather api
            axios.get("https://weatherapi.cyclic.app/weather/Ankara?units=metric&lang=tr https://api.openweathermap.org/data/2.5/forecast/daily?q=Izmir&units=metric&lang=tr&appid=a3f46c687f2144a15d0adc8b5d513af2")
            .then((response) => {
                this.weatherData = response.data.list.splice(0, 5);
                this.todayTemp = Math.round(response.data.list[0].temp.day);
                this.$store.state.weatherData = response.data.list.splice(0, 5);
            }).
            catch(error => {
                console.log(error);
            });
        }
    }
</script>
