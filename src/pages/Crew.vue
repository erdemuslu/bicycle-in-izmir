<template>
    <div class="crew">
        <div class="container">
            <ul>
                <li v-for="item in crew">
                    <div>
                        <img :src=item.photo alt="ozan-photo">
                    </div>
                    <h1>{{ item.name }}</h1>
                    <h2>{{ item.title }}</h2>
                    <a target="_blank" :href=item.linkedin class="button">linkedin</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ozanPhoto from "../assets/ozan_akman.jpeg";
    import cemPhoto from "../assets/tahsin_cem_yilmaz.jpeg";
    import erdemPhoto from "../assets/erdem_uslu.jpeg";

    export default {
        name: "Crew",
        data() {
            return {
                photo: {
                    "ozan": ozanPhoto
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
                ]
            }
        }
    }
</script>
