<template>
    <div class="home">
        <div class="home-block home-block--left">
            <img :src=mainIcon alt="main-icon">
        </div>
        <div class="home-block home-block--right">
            <div>
                <p>Bisim'in sağladığı bisiklet kiralama hizmetine ait istasyonlardaki doluluk oranını görebilirsiniz.</p>
                <router-link to="/list" class="button">İstasyonları Gör</router-link>
                <h1>İzmir'de hava {{todayTemp}} derece.</h1>
                <h4>Bisiklet'e binmek icin harika bir gun!</h4>
                <ul class="weather">
                    <li class="weather__block" v-for="item in weatherData">
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
    import mainIcon from '../assets/main-icon.svg';
    import clear from '../assets/clear.svg';

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
                    "Rain": clear,
                },
                weatherData: this.$store.state.weatherData,
                todayTemp: this.$store.state.todayTemp
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
            axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
            .then((response) => {
                this.$store.state.stations = response.data.network.stations;
                Array.prototype.map.call(response.data.network.stations, (item) => {
                    this.totalBicycles += item.extra.slots;
                    this.totalFreeBicycles += item.empty_slots;
                })
            });
            // weather api
            axios.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=Izmir&units=metric&lang=tr&appid=a3f46c687f2144a15d0adc8b5d513af2")
            .then((response) => {
                this.weatherData = response.data.list.splice(0, 5);
                this.todayTemp = Math.round(response.data.list[0].temp.day);
                this.$store.state.weatherData = response.data.list.splice(0, 5);
                this.$store.state.todayTemp = response.data.list[0].temp.day;
            }).
            catch(error => {
                console.log(error);
            });
        }
    }
</script>
