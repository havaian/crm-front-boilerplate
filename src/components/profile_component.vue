<template>
  <div id="wrapper">
    <h1>Profile</h1>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    data() {
    },
    mounted() {
      // Function for dynamically changing the label of the current page
      for (let x = 0; x < document.querySelector('.active.exact-active').attributes.length; x++) {
        if (document.querySelector('.active.exact-active').attributes[x].name == 'modelvalue') {
          document.querySelector('#page-title').innerHTML = '';
          document.querySelector('#page-title').append(document.querySelector('.active.exact-active').attributes[x].nodeValue);
        }
      }
    },
  }
</script>

<style scoped>

</style>