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
                        <h4>Boşta Bisiklet</h4>
                        <span>{{this.totalFreeBicycles}}</span>
                    </div>                    
                    <div>
                        <h4>Toplam Bisiklet</h4>
                        <span>{{this.totalBicycles}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import homeBG from "../assets/main-bg.png";

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
            this.$store.dispatch("getDatas");
            Array.prototype.map.call(this.$store.state.stations, (item) => {
                this.totalBicycles += item.extra.slots;
                this.totalFreeBicycles += item.free_bikes;
            })
        }
    }
</script>
