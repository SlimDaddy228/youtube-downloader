<template>
  <v-container fluid class="pa-0">
    <v-app-bar>
      <v-container class="d-flex pa-0">
        <v-tooltip bottom color="white">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                class="mr-2"
                style="cursor: pointer"
                v-bind="attrs"
                v-on="on"
                @click="redirect()"
            >
              mdi-youtube
            </v-icon>
          </template>
          <span>Открыть ютуб</span>
        </v-tooltip>
        <v-toolbar-title>YTV-Downloader</v-toolbar-title>
      </v-container>

      <v-spacer/>

      <v-btn
          class="ml-5"
          v-for="item in routes"
          :key="item.path"
      >
        <router-link :to="item.path">
          {{ item.label }}
        </router-link>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
import {ROUTES, YOUTUBE_URL} from "@/const/routes";

export default {
  name: "Navbar",
  data: () => ({
    routes: ROUTES
  }),
  methods: {
    redirect() {
      window.location.replace(YOUTUBE_URL)
    }
  }
}
</script>

<style scoped>

</style>