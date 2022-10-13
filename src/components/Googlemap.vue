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
                        latitude: parseFloat(38.4047512791),
                        longitude: parseFloat(27.0701936867)
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
                    if(this.$store.state.stations[index].Koordinat != ""){
                        const obj = {
                            "name": this.$store.state.stations[index].IstasyonAdi,
                            "desc": `<h4>${this.$store.state.stations[index].IstasyonAdi}</h4><p>Burada <b>${this.$store.state.stations[index].BisikletSayisi}</b>/${(this.$store.state.stations[index].Kapasite)} bisiklet bulunmaktadır.</p>`,
                            "latitude": (this.$store.state.stations[index].Koordinat.split(',')[0]).trim(),
                            "longitude": (this.$store.state.stations[index].Koordinat.split(',')[1]).trim()
                        };
                        arr.push(obj);
                    }
                
            };
            this.bounds = new google.maps.LatLngBounds();
            const element = document.getElementById(this.mapName);
            const mapCentre = arr[0]
            const options = {
              center: new google.maps.LatLng(parseFloat(mapCentre.latitude), parseFloat(mapCentre.longitude))
            }
            this.map = new google.maps.Map(element, options);

            function NoktalarWindow(marker,message){
                var InfoWindow = new google.maps.InfoWindow({
                    content: message
                });
                google.maps.event.addListener(marker, 'click', function () {
                    InfoWindow.open(this.map, marker);
                });
            }

            arr.forEach((coord) => {
              const position = new google.maps.LatLng(coord.latitude, coord.longitude);
              const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                title: coord.name,
                clickable: true,
                icon: 'https://image.ibb.co/kkADRy/marker_icon.png'
              });
              NoktalarWindow(marker, coord.desc);
            
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
