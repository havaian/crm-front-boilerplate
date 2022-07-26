<template>
  <div id="map">
  </div>
</template>

<script>

  export default {
    name: "Map",
    mounted() {
      const map = L.map('map', {
        drawControl: false,
      })
      .setView([41.31, 69.28], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
      }).addTo(map);

      for (let x = 0; x < document.querySelector('.active.exact-active').attributes.length; x++) {
        if (document.querySelector('.active.exact-active').attributes[x].name == 'modelvalue') {
          document.querySelector('#page-title').innerHTML = '';
          document.querySelector('#page-title').append(document.querySelector('.active.exact-active').attributes[x].nodeValue);
        }
      }
    }
  }

</script>

<style scoped>

</style>
