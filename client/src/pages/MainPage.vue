<template>
  <v-app>
    <v-container>
      <v-text-field
          class="mr-5 mb-2"
          placeholder="www.youtube.com"
          outlined
          v-model="url"
          :rules="rules"
      >
        Field
      </v-text-field>
      <template v-if="Object.keys(rows).length <= 0 || url.length > 0">
        <v-btn>
          <template v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
          </template>
          <template v-else>
            <v-tooltip bottom color="white">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    @click="onClickFind()"
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-arrow-collapse-down
                </v-icon>
              </template>
              <span>Загрузить видео</span>
            </v-tooltip>
          </template>
        </v-btn>
      </template>
      <template v-if="Object.keys(rows).length > 0">
        <v-btn
            v-for="item in rows.formats"
            :key="item.qualityLabel"
            @click="onClickRedirect(item.url)"
        >
          {{item.qualityLabel}}
          <template v-if="!item.hasAudio">
            <v-icon class="ml-2">mdi-volume-mute</v-icon>
          </template>
        </v-btn>
      </template>
      <template v-if="Object.keys(rows).length > 0">
        <video
            v-for="(item, index) in rows.formats"
            v-if="item.quality === 134 && !item.hasAudio"
            :key="item.quality + index"
            class="mt-5"
        >
          <source :src="item.url" type="video/mp4" />
        </video>
        <video
            v-for="(item, index) in rows.formats"
            v-if="item.hasAudio"
            controls
            class="mt-5"
            :key="item.qualityLabel + index"
        >
          <source :src="item.url" type="video/mp4" />
        </video>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import {getInformationByUrl} from "@/http/downloaderAPI";

export default {
  name: "DownloadPage",
  data() {
    return {
      loading: false,
      url: '',
      rows: {},
      rules: [
        (value) => !!value || "Введите ссылку",
        (value) => this.isURL(value) || "Некорректная ссылка",
      ],
    }
  },
  methods: {
    isURL(str) {
      let url;
      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
    onClickRedirect(url) {
      window.location.replace(url)
    },
    onClickFind() {
      this.loading = true
      getInformationByUrl(this.url)
          .then(response => {
            this.rows = response
            this.url = ''
          })
          .catch(() => {
            this.url = ''
            this.rows = {}
          })
          .finally(() => this.loading = false)
    }
  }
}
</script>

<style scoped>

</style>