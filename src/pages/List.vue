<template>
    <div class="list">
        <div class="container">
            <div class="col">
                <ul>
                    <li v-for="item in items">                    
                        <div>
                            <h2>{{ item.name }}</h2>
                            <div>
                                <h4>Toplam Park: </h4>
                                <span>{{ item.extra.slots }}</span>
                            </div>
                            <div>
                                <h4>Bisiklet: </h4>
                                <span>{{ item.empty_slots }}</span>
                            </div>
                        </div>
                        <div>
                            <radial-progress-bar :diameter="50"
                                                   :completed-steps="item.empty_slots"
                                                   :total-steps="item.extra.slots"
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
        components: {
            Googlemap,
            RadialProgressBar
        },
        beforeCreate() {
            const arr = [];
            // baksi api
            axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
            .then((response) => {
                this.items = response.data.network.stations;
            });
        }
    }
</script>
