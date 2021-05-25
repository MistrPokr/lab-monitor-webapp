<template>
  <v-card class="mb-4">
    <v-card-title>
      Stream Controls
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      STREAM STATUS:
      <b>LIVE</b>
    </v-card-text>
    <v-card-actions>
      <v-btn color="" @click="startStream">Start Stream</v-btn>
      <v-btn color="red" @click="stopStream">Stop Stream</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="primary" @click="reloadPlayer">Reload Player</v-btn>
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