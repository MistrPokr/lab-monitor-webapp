<template>
  <v-container
      fluid
      class="grey lighten-5 mb-6">
    <!--    TODO Move video player to top for sm/md views-->
    <v-row>
      <v-col
          class="mt-4"
          cols="12" sm="12" md="4" lg="4" xl="4"
          order="12" order-md="1">
        <v-card
            class="mb-4"
        >
          <v-card-title>
            Voice Controls
          </v-card-title>
          <!--      one action component per v-card-actions-->
          <v-divider></v-divider>
          <v-card-actions class="mx-2">
            <v-form>
              <v-select
                  v-model="ttsPrerecorded"
                  :items="selectPrerecordedOptions"
                  item-text="text"
                  item-value="value">
              </v-select>
              <v-text-field
                  id="textarea"
                  v-model="messageText"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                  v-if="!ttsPrerecorded"
              >
              </v-text-field>
              <v-radio-group v-model="speechChoice">
                <v-radio v-for="str in speechOptions"
                         :key=str
                         :label=str
                         :value=str
                >
                </v-radio>
              </v-radio-group>
            </v-form>
          </v-card-actions>
          <v-card-actions class="mx-2">
            <v-btn color="primary">
              SUBMIT
            </v-btn>
            <v-btn color="">RESET</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
            class="mb-4"
        >
          <v-card-title>
            <div>Servo Controls</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!--              TODO Method to get current servo angle-->
            <!--            TODO Add slider? -->
            <div>
              Current Angle:
              <v-chip>
                <b>45</b>
              </v-chip>
            </div>
          </v-card-text>
          <v-card-actions class="mx-2">
            <v-btn color="">LEFT</v-btn>
            <v-btn color="primary">RESET</v-btn>
            <v-btn color="">RIGHT</v-btn>
          </v-card-actions>
        </v-card>
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
            <v-btn
                color=""
                @click="startStream"
            >Start Stream
            </v-btn>
            <v-btn
                color="red"
                @click="stopStream"
            >Stop Stream
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
                color="primary"
                @click="reloadPlayer"
            >Reload Player
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="mt-4"
             cols="12" sm="12" md="8" lg="8" xl="8"
             order="1" order-md="2"
      >
        <v-card>
          <v-card-title>
            LIVE FEED
          </v-card-title>
          <video-player class="vjs-big-play-centered" ref="videoPlayer" :options="videoOptions"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      speechOptions: [
        "A lovely evening! ",
        "How's it going? "
      ],
      speechChoice: "",
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