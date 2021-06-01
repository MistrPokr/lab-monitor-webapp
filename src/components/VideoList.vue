<template>
  <v-card>
    <v-card-title>
      视频列表
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-data-table>

      </v-data-table>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "VideoList",
  data() {
    return {
      videoList: null,
    }
  },
  methods: {
    updateVideoList: function () {
      let that = this;
      axios
          .get("/video/list/")
          .then(function (response) {
            that.videoList = response.data;
          })
    }
  },
  mounted() {
    this.updateVideoList();
  }
}
</script>

<style scoped>

</style>