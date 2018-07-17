<template>
    <div class="list">
        <div class="container">
            <a @click="$router.go(-1)">back</a>
            <ul>
                <li v-for="item in items">
                    <span>{{ item.empty_slots }}</span>
                    <h2>{{ item.name }}</h2>
                    <div>
                        <div>
                            <h4>Toplam Park</h4>
                            <span>{{ item.extra.slots }}</span>
                        </div>
                        <div>
                            <h4>Bisiklet</h4>
                            <span>{{ item.empty_slots }}</span>
                        </div>
                    </div>
                    <p v-if="item.empty_slots === 0">
                        <span class="inactive"></span>
                    </p>                    
                    <p v-else>
                        <span class="active"></span>
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
