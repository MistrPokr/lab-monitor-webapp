<template>
  <v-row
      class="mt-4"
      align="center"
  >
    <v-col
        class="ml-4"
        cols="4">
      <v-row class="ma-auto mb-3">
        <v-card>
          <v-form>
            <v-select
                v-model="ttsPrerecorded"
                :items="selectPrerecordedOptions"
                item-text="text"
                item-value="value"
            ></v-select>

            <v-text-field
                id="textarea"
                v-model="messageText"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                v-if="!ttsPrerecorded"
            >
            </v-text-field>
            <v-radio
                id="radio-group"
                name="radio-options"
                :options="radioOptions"
                v-if="!ttsPrerecorded"
            ></v-radio>
          </v-form>
          <v-btn type="submit" color="primary">Submit</v-btn>
          <v-btn type="reset" color="danger">Reset</v-btn>
        </v-card>
      </v-row>
      <v-row class="ma-auto mb-3">
        <v-card>
          <p>Current Angle:
            <span class="badge badge-success">4</span>
          </p>
          <v-row size="sm">
            <v-btn>Rotate Left</v-btn>
            <v-btn color="primary">Reset</v-btn>
            <v-btn>Rotate Right</v-btn>
          </v-row>
        </v-card>
      </v-row>
      <v-row class="ma-auto mb-3">
        <v-card>
          <v-row>
            <v-card-title>
              LIVE
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions align="center" justify="space-around">
              <!--          TODO Whole card changes color on stream status change; e.g. Red on live stream. -->
              <v-btn @click="startStream">
                Start Stream
              </v-btn>
              <v-btn @click="stopStream" color="deep-orange">
                Stop Stream
              </v-btn>
              <v-btn @click="reloadPlayer" color="primary" size="sm">
                Reload Player
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-row>
    </v-col>
    <v-spacer></v-spacer>
    <v-col class="mr-4"
           cols="6">
      <video-player class="vjs-big-play-centered" ref="videoPlayer" :options="videoOptions"/>
    </v-col>
  </v-row>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import axios from "axios";

export default {
  name: "VideoMain",
  components: {
    VideoPlayer
  },
  data() {
    return {
      messageText: null,
      ttsPrerecorded: true,
      radioOptions: [
        {text: 'Male Voice', value: 'male1'},
        {text: 'Female Voice', value: 'female1'},
      ],
      selectPrerecordedOptions: [
        {value: true, text: 'Prerecorded Text'},
        {value: false, text: 'Custom Text'},
      ],
      videoOptions: {
        // autoplay: 'muted',
        controls: true,
        sources: [{
          // Dummy MP4 url
          // src: "http://vjs.zencdn.net/v/oceans.mp4",
          // type: "video/mp4",

          // Dummy HLS url from Akamai
          src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          type: "application/x-mpegURL",

          // HLS
          // src: "http://192.168.0.138:8001/live/py/index.m3u8",
          // type: "application/x-mpegURL",

          // DASH (disabled in media server config)
          // src: "http://192.168.0.138:8001/live/py/index.mpd",
          // type: "application/dash+xml",
        }],
        fill: true,
        responsive: true,
        aspectRatio: '16:9',
      }
    }
  },
  methods: {
    startStream() {
      axios
          .get("http://localhost:8000/api/stream")
          .then(response => (console.log(response)))
      this.reloadPlayer();
    },
    stopStream() {
      axios
          .post("http://localhost:8000/api/stream")
          .then(response => (console.log(response)))
    },
    reloadPlayer() {
      console.log("Reloading Player...");
      this.$refs.videoPlayer.player.src(this.videoOptions.sources)
      this.$refs.videoPlayer.player.load();
      this.$refs.videoPlayer.player.play();
    }
  },
  mounted() {
    // this.$refs.videoPlayer.$on(
    //     'error',
    //     setTimeout(() => {
    //           console.log("Resetting Player...");
    //           // console.log(this.$refs.videoPlayer);
    //           this.$refs.videoPlayer.player.reset();
    //         }, 2000
    //     ));

  }

}
</script>

<style scoped>
</style>