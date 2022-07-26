<template>
  <div id="map">
  </div>
</template>

<script>

  export default {
    name: "Map",
    mounted() {

      for (let x = 0; x < document.querySelector('.active.exact-active').attributes.length; x++) {
        if (document.querySelector('.active.exact-active').attributes[x].name == 'modelvalue') {
          document.querySelector('#page-title').innerHTML = '';
          document.querySelector('#page-title').append(document.querySelector('.active.exact-active').attributes[x].nodeValue);
        }
      }

      const map = L.map('map', {
        drawControl: false,
      })
      .setView([41.31, 69.28], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
      }).addTo(map);

      let drawControl;
      let drawnItems = new L.FeatureGroup();

      drawControl = new L.Control.Draw({
        position: 'topright',
          draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: 'blue', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!', // Message that will show when intersect
            },
            shapeOptions: {
                color: 'red',
            }
          },
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        rectangle: false,
      },
        edit: {
          featureGroup: drawnItems,
          remove: true,
        },
      });

      map.addControl(drawControl);

      map.on("created", (e) => {
        
      })

    }
  }

</script>

<style scoped>

</style>
