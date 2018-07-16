<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
    @import "./style/app"
</style>

<script>
    import { mapActions } from 'vuex';

    export default {
        created() {
            this.$store.dispatch("getDatas");
        }
    }
</script>
