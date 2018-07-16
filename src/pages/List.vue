<template>
    <div class="list">
        <div class="container">
            <a @click="$router.go(-1)">back</a>
            <ul>
                <li v-for="item in items">
                    <span>{{ item.free_bikes }}</span>
                    <h2>{{ item.name }}</h2>
                    <div>
                        <div>
                            <h4>Toplam</h4>
                            <span>{{ item.extra.slots }}</span>
                        </div>
                        <div>
                            <h4>Boşta</h4>
                            <span>{{ item.free_bikes }}</span>
                        </div>
                    </div>
                    <p v-if="item.extra.status === 'Active'">
                        <span class="active"></span>
                    </p>                    
                    <p v-else>
                        <span class="inactive"></span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                items: this.$store.state.stations
            }
        },
        beforeCreated() {
            this.$store.dispatch("getDatas");
        }
    }
</script>
