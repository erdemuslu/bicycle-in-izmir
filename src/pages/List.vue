<template>
    <div class="list">
        <div class="container">
            <div class="col">
                <ul>
                    <li v-for="item in items">                    
                        <div>
                            <h2>{{ item.IstasyonAdi }}</h2>
                            <div>
                                <h4>Toplam Park: </h4>
                                <span>{{ item.Kapasite }}</span>
                            </div>
                            <div>
                                <h4>Bisiklet: </h4>
                                <span>{{ (item.BisikletSayisi) }}</span>
                            </div>
                        </div>
                        <div>
                            <radial-progress-bar :diameter="50"
                                :completed-steps="((item.Kapasite)-(item.BisikletSayisi))"
                                :total-steps="item.Kapasite"
                                :strokeWidth="strokeWidth"
                                innerStrokeColor="#f0effd"
                                startColor="#2541B2">
                            </radial-progress-bar>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col">
                <Googlemap name="izmir" :izmirMarkers="markers" />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import RadialProgressBar from 'vue-radial-progress';
    import Googlemap from '../components/Googlemap.vue';

    export default {
        name: "List",
        data() {
            return {
                items: this.$store.state.stations,
                markers: Array,
                strokeWidth: 2
            }
        },
        computed: {
            stations() {
                return this.$store.state.stations
            }
        },
        components: {
            Googlemap,
            RadialProgressBar
        },
        beforeCreate() {

            const arr = [];
            // bisim api
            axios.get("https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar")
            .then((response) => {
                this.items = response.data.stations.filter((item,index,array) =>{
                    if(item.Kapasite == "0"){
                        return false
                    }
                    item.Kapasite = parseInt(item.Kapasite)
                    return this.$store.state.stations = array;
                })
            });
            
        }
    }
</script>
