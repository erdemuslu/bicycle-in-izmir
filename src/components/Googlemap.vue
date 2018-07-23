<template>
    <div class="container">
        <div class="google-map" :id="mapName"></div>
    </div>
</template>

<script>
    export default {
        name: 'google-map',
        props: ['name'],
        data: function () {
            return {
                mapName: this.name + "-map",
                markerCoordinates: [{
                    latitude: 38.4047512791,
                    longitude: 27.0701936867
                }, {
                    latitude: 38.4006949388,
                    longitude: 27.0781865266
                }, {
                    latitude: 38.3992000613,
                    longitude: 27.0837509082
                }],
                map: null,
                bounds: null,
                markers: []
            }
        },
        mounted: function () {
            this.bounds = new google.maps.LatLngBounds();
            const element = document.getElementById(this.mapName);
            const mapCentre = this.markerCoordinates[0]
            const options = {
              center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
            }
            this.map = new google.maps.Map(element, options);
            this.markerCoordinates.forEach((coord) => {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                clickable: true,
                icon: 'https://image.ibb.co/kkADRy/marker_icon.png'
              });

            marker.addListener('click', function(event) {
                console.log(event);
            });
            
            this.markers.push(marker)
              this.map.fitBounds(this.bounds.extend(position))
            });
        }
    };
</script>

<style lang='scss' scoped>
    .google-map {
        width: 800px;
        height: 600px;
        margin: 0 auto;
        background: gray;
    }
</style>
