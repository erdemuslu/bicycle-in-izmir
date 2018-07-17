<template>
    <div class="home">
        <div class="home-bg">
            <img :src=homeBG alt="home-bg">
        </div>
        <div class="home-content">
            <h1>İzmir'deki Bisiklet <br>İstasyonları</h1>
            <p>Bisim'in sağladığı bisiklet kiralama hizmetine ait istasyonlardaki doluluk oranını görebilirsiniz.</p>
            <div>                
                <button class="button" v-on:click="handlePages">İstasyonları Gör</button>
                <div>
                    <div>
                        <h4>Kullanılabilir Bisiklet</h4>
                        <span>{{this.totalFreeBicycles}}</span>
                    </div>                    
                    <div>
                        <h4>Toplam Park</h4>
                        <span>{{this.totalBicycles}}</span>
                    </div>
                </div> 
            </div>
            <span>
                Veriler 
                <a target="_blank" href="//citybik.es">citybik.es</a>
                tarafından sağlanmaktadır
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import axios from 'axios';
    import homeBG from "../assets/main-bg-min.png";

    export default {
        name: "Home",
        data() {
            return {
                pageName: "Home page",
                homeBG: homeBG,
                totalBicycles: 0,
                totalFreeBicycles: 0
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
            axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
              .then((response) => {
                this.$store.state.stations = response.data.network.stations;
                Array.prototype.map.call(response.data.network.stations, (item) => {
                    this.totalBicycles += item.extra.slots;
                    this.totalFreeBicycles += item.empty_slots;
                })
            })
        }
    }
</script>
