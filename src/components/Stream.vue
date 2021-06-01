<template>
  <v-card class="mb-4">
    <v-card-title>
      直播控制
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      直播状态：
      <b>在线</b>
    </v-card-text>
    <v-card-actions>
      <v-btn color="" @click="startStream">开始直播</v-btn>
      <v-btn color="red" @click="stopStream">停止直播</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="primary" @click="reloadPlayer">刷新播放器</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Stream",
  data() {
    return {};
  },
  methods: {
    startStream() {
      axios
          .get("/api/stream")
          .then((response) => console.log(response));
      this.reloadPlayer();
    },
    stopStream() {
      axios
          .post("/api/stream")
          .then((response) => console.log(response));
    },
    reloadPlayer() {
      console.log("Reloading Player...");
      this.$refs.videoPlayer.player.src(this.videoOptions.sources);
      this.$refs.videoPlayer.player.load();
      this.$refs.videoPlayer.player.play();
    },
  }
}
</script>

<style scoped>

</style>