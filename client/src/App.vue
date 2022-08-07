<template>
  <v-app>
    <Navbar/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
* {
  color: rgba(0, 0, 0, 0.87) !important;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: Rubik, sans-serif;
  overflow: hidden;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>