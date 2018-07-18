<template>
  <div class="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: "App",
        components: {
            Header
        }
    };
</script>

<style lang="scss">
    @import "./style/style"
</style>
