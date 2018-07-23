<template>
    <div class="home">
        <div class="container">
            <Googlemap name="izmir" />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import axios from 'axios';
    import moment from 'moment';
    import mainIcon from '../assets/main-icon.svg';
    import clear from '../assets/clear.svg';
    import rain from '../assets/rain.svg';

    import Googlemap from '../components/Googlemap.vue';

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
        components: {
            Googlemap
        },
        created() {
            // baksi api
            axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
            .then((response) => {
                this.$store.state.stations = response.data.network.stations;
                console.log(response.data.network.stations);
                Array.prototype.map.call(response.data.network.stations, (item) => {
                    this.totalBicycles += item.extra.slots;
                    this.totalFreeBicycles += item.empty_slots;
                })
            });
            // weather api
            axios.get("https://api.openweathermap.org/data/2.5/forecast/daily?q=Izmir&units=metric&lang=tr&appid=a3f46c687f2144a15d0adc8b5d513af2")
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
