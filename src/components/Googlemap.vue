<template>
    <div>
        <div class="google-map" :id="mapName"></div>
    </div>
</template>

<script>
    export default {
        name: 'google-map',
        props: ['name', 'izmirMarkers'],
        data: function () {
            return {
                mapName: this.name + "-map",
                markerCoordinates: [
                    {
                        latitude: 38.4047512791,
                        longitude: 27.0701936867
                    }
                ],
                map: null,
                bounds: null,
                markers: []
            }
        },
        mounted() {
            const arr = [];
            for (const index in this.$store.state.stations) {
                const obj = {
                    "latitude": this.$store.state.stations[index].latitude,
                    "longitude": this.$store.state.stations[index].longitude
                };
                arr.push(obj);
            };
            this.bounds = new google.maps.LatLngBounds();
            const element = document.getElementById(this.mapName);
            const mapCentre = arr[0]
            const options = {
              center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
            }
            this.map = new google.maps.Map(element, options);

            arr.forEach((coord) => {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                clickable: true,
                icon: 'https://image.ibb.co/kkADRy/marker_icon.png'
              });
            
            this.markers.push(marker)
              this.map.fitBounds(this.bounds.extend(position))
            });
        }
    };
</script>

<style lang='scss' scoped>
    .google-map {
        width: 100%;
        height: calc(100vh - 16em);
        margin: 0 auto;
    }
</style>
