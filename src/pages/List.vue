<template>
    <div class="list">
        <div class="container">
            <div class="col">
                Liste
            </div>
            <div class="col">
                <Googlemap name="izmir" />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Googlemap from '../components/Googlemap.vue';

    export default {
        name: "List",
        data() {
            return {
                items: this.$store.state.stations
            }
        },
        components: {
            Googlemap
        },
        created() {
            // baksi api
            axios.get("https://api.citybik.es//v2/networks/baksi-bisim")
            .then((response) => {
                this.items = response.data.network.stations;
            });
        }
    }
</script>
