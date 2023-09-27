<template>
    <header class="header">
        <div class="header__logo">
            <router-link to="/">B</router-link>
        </div>
        <div class="header__nav">
            <router-link active-class="is-active" to="/" exact>Anasayfa</router-link>
            <router-link active-class="is-active" to="/list">İstasyonlar</router-link>
            <router-link active-class="is-active" to="/crew">Katkıda Bulunanlar</router-link>
            <a href="https://github.com/ramazansancar/bicycle-in-izmir">
                <img class="icon" :src="icons.github" alt="github">
            </a>
        </div>
    </header>
</template>

<script>
    import github from "../assets/github.svg";

    export default {
        name: "Header",
        data() {
            return {
                icons: {
                    "github": github
                }
            }
        }
    }
</script>
