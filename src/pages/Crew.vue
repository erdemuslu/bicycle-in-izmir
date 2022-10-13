<template>
    <div class="crew">
        <div class="container">
            <ul>
                <li v-for="item in crew">
                    <div>
                        <img :src=item.photo :alt="item.name">
                    </div>
                    <h1>{{ item.name }}</h1>
                    <h2>{{ item.title }} {{linkedin}}</h2>
                    <a target="_blank" :href=item.linkedin class="button"><img class="icon" :src="icons.linkedin" alt="linkedin">linkedin</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ozanPhoto from "../assets/ozan_akman.jpeg";
    import cemPhoto from "../assets/tahsin_cem_yilmaz.jpeg";
    import erdemPhoto from "../assets/erdem_uslu.jpeg";
    import yigitPhoto from "../assets/yigit_cukuren.jpeg";
    import ramazanPhoto from "../assets/ramazan_sancar.jpg";
    import linkedin from "../assets/linkedin.svg";

    export default {
        name: "Crew",
        data() {
            return {
                icons: {
                    "linkedin": linkedin
                },
                crew: [
                    {
                        "name": "Erdem Uslu",
                        "title": "Frontend Developer",
                        "linkedin": "https://www.linkedin.com/in/erdem-uslu",
                        "photo": erdemPhoto
                    },
                    {
                        "name": "Ozan Akman",
                        "title": "Software Developer",
                        "linkedin": "https://www.linkedin.com/in/ozanakman/",
                        "photo": ozanPhoto
                    },
                    {
                        "name": "Tahsin Cem Yılmaz",
                        "title": "Software Developer",
                        "linkedin": "https://www.linkedin.com/in/tahsin-cem-yilmaz/",
                        "photo": cemPhoto
                    },
                    {
                        "name": "Yiğit Çüküren",
                        "title": "Backend Developer",
                        "linkedin": "https://www.linkedin.com/in/yigitcukuren/",
                        "photo": yigitPhoto
                    },
                    {
                        "name": "Ramazan Sancar",
                        "title": "Full Stack Developer",
                        "linkedin": "https://www.linkedin.com/in/ramazansancar/",
                        "photo": ramazanPhoto
                    },
                ]
            }
        }
    }
</script>

<style>
.icon{
    padding-right:5px
}
</style>