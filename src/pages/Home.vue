<template>
    <div class="home">
        <div class="home-block home-block--left">
            <img :src=mainIcon alt="main-icon">
        </div>
        <div class="home-block home-block--right">
            <div>
                <h1>İzmir'de hava {{todayTemp}} derece.</h1>
                <ul class="weather">
                    <li class="weather__block" v-for="item in weatherDatas">
                        <h3>Carsamba</h3>
                        <img :src=weatherIcons.clear alt="clear">
                        <span>{{ item.temp.day }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import axios from 'axios';
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
                    "clear": clear
                },
                weatherDatas: [],
                todayTemp: null
            }
        },
        computed: {
            stations() {
                return this.$store.state.stations
            }
        },
        methods: {
            handlePages() {
                this.$router.push('/list');
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
            axios.get("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=a3f46c687f2144a15d0adc8b5d513af2&q=Izmir&units=metric&lang=tr")
            .then((response) => {
                console.log(response);
                // day limit for weather datas
                const dayLimit = 5;
                this.weatherDatas = response.data.list.slice(0, dayLimit);
                this.todayTemp = response.data.list.slice(0, dayLimit)[0].temp.day;
            }).
            catch(error => {
                console.log(error);
            });
        }
    }
</script>
