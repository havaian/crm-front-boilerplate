<template>
  <div id="content-wrapper">
        <div class="menu">
            <div class="menu-wrapper">
              <router-link v-for="item in menuItems" :key="item.key" :to="item.link" v-model="item.key">
                <span class='nav-icon'>{{item.icon}}</span>
              </router-link>
            </div>
            <div class="page-title-container">
              <p id="page-title"></p> 
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        menuItems: [
          {
            key:'map',
            title: 'Main',
            icon: '🏠',
            alt: 'Map Icon',
            link: '/',
          },
        ],
        pageTitle: 'Map'
      };
    },
    mounted() {}
  }

</script>

<style>

</style>
