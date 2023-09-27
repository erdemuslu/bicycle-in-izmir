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
                        <h3 style="font-weight: bold;">{{ item.date }}</h3>
                        <img :src="(item.weather_icon) ? `https://openweathermap.org/img/wn/${item.weather_icon}@2x.png` : weatherIcons.loading" :alt="item.weather_description">
                        <span>{{ Math.round(item.temp_day) }}°C</span>
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
    import loading from '../assets/loading.svg';

    export default {
        name: "Home",
        data() {
            return {
                pageName: "Home",
                mainIcon: mainIcon,
                totalBicycles: 0,
                totalFreeBicycles: 0,
                weatherIcons: {
                    "loading": loading,
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
            // weather api Source Code: https://github.com/ramazansancar/weatherApi
            axios.get("https://weatherapi.cyclic.app/weather/weekly/daily/Izmir?units=metric&lang=tr&count=7&api=a3f46c687f2144a15d0adc8b5d513af2")
            .then((response) => {
                let weatherData = response.data.data.days;
                weatherData.forEach((item, index) => {
                    // Time format 2023-01-01T00:00:00Z
                    //item.datetime = item.datetime.replace(' ','T').concat('Z')//moment().format('DD-MM-YYYYTHH:mm:ssZ')
                    //moment convert 26.09.2023T13:00:00Z
                    console.log(item.date)
                    //item.datetime = moment(item.date).format('DD.MM.YYYY');

                    //item.datetime = moment(item.datetime).locale('tr').format('dddd');
                });
                console.log(weatherData)
                this.weatherData = weatherData
                this.todayTemp = Math.round(this.weatherData.days[0].temp_day);
                this.$store.state.weatherData = weatherData
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
</script>
