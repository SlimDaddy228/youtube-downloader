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

      <template v-if="!videoData || url.length > 0">
      <!-- Checks if it is loaded, or the user writes - then it displays the video download button, if the user clicks on the button, then the video is loaded with animation -->
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

      <template v-if="videoData"> <!-- Buttons to redirect video URL -->
        <v-btn
            v-for="item in videoData"
            :key="item.qualityLabel"
            @click="onClickRedirect(item.url)"
        >
          {{item.qualityLabel}}
          <template v-if="!item.hasAudio">
            <v-icon class="ml-2">mdi-volume-mute</v-icon>
          </template>
        </v-btn>
      </template>

      <template v-if="videoData">
        <video 
            v-for="(item, index) in videoData"
            v-if="item.quality === 134 && !item.hasAudio"
            :key="item.quality + index"
            class="mt-5"
        > <!-- Loads an image if there is no video with sound -->
          <source :src="item.url" type="video/mp4" />
        </video>
        <video
            v-for="(item, index) in videoData"
            v-if="item.hasAudio"
            controls
            class="mt-5"
            :key="item.qualityLabel + index"
        > <!-- Loads a video with sound to view it on the page, if available -->
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
      videoData: null,
      rules: [
        (value) => !!value || "Введите ссылку",
        (value) => this.isURL(value) || "Некорректная ссылка",
      ],
    }
  },
  methods: {
  /**
   * Checking if this string === url link
   * @param {str} string - The text to repeat
   */
    isURL(str) {
      let url;
      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
  /**
   * Redirect to URL link
   * @param {url} string - The text to repeat
   */
    onClickRedirect(url) {
      window.location.replace(url)
    },
    onClickFind() {
      this.loading = true
      getInformationByUrl(this.url)
          .then(response => {
            this.videoData = response
            this.url = ''
          })
          .finally(() => {
            this.url = ''
            this.loading = false
          })
    }
  }
}
</script>

<style scoped>

</style>