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
      var popup;
      var layer;
      var popupContent;

      let drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      let options = {
        position: 'topright',
        draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: 'red', // Color the shape will turn when intersects
                message: 'Lines should not intersect', // Message that will show when intersect
            },
            shapeOptions: {
                color: '#50b8e7',
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
      }

      const reloadDrawControl = () => {
        if (drawControl === undefined) {
          drawControl = new L.Control.Draw(options);
          map.addControl(drawControl);
        } else {
          if (!drawControl.getContainer()) {
            map.removeControl(drawControl);
            drawControl = new L.Control.Draw(options);
            map.addControl(drawControl);
          } else {

          }
        }
      }

      const loadPopup = (events, layer) => {
        
        if (events === 'created') {
          popupContent = `
            <table id="popup-content">
              <tr>
                <td><label for="name"></label>Name</td>
                <td><input name="name" type="text" required></td>
              </tr>
              <tr>
                <td><label for="area"></label>Area</td>
                <td><input name="area" type="number" required disabled></td>
              </tr>
              <tr>
                <td><label for="type"></label>Type</td>
                <td><select name="type" required></select></td>
              </tr>
              <tr>
                <td><label for="description"></label>Description</td>
                <td><input name="description" type="text" required></td>
              </tr>
            </table>
          `
          layer.bindPopup(popupContent).openPopup();
        } else {
          popupContent = `
            <table id="popup-content">
              <tr>
                <td>Name</td>
                <td><input></td>
              </tr>
              <tr>
                <td>Area</td>
                <td></td>
              </tr>
              <tr>
                <td>Type</td>
                <td></td>
              </tr>
              <tr>
                <td>Description</td>
                <td></td>
              </tr>
            </table>
          `
        }

      }

      reloadDrawControl();

      map.on("draw:created", (e) => {

        reloadDrawControl();

        // map.removeControl(drawControl);
        // drawControl = new L.Control.Draw({
        //     position: 'topright',
        //     draw: false,
        //     edit: {
        //         featureGroup: drawnItems,
        //         remove: true,
        //     }
        // });
        // map.addControl(drawControl);

        layer = e.layer;
        drawnItems.addLayer(layer);

        loadPopup('created', layer);
        
      })

      map.on("draw:deleted", (e) => {

        reloadDrawControl();

      })

    }
  }

</script>

<style scoped>

</style>
