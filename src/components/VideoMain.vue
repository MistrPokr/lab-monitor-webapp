<template>
  <v-container fluid class="grey lighten-5 mb-6">
    <!--    TODO Move video player to top for sm/md views-->
    <v-row>
      <v-col
        class="mt-4"
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        order="12"
        order-md="1"
      >
        <text-to-speech></text-to-speech>
        <v-card class="mb-4">
          <v-card-title>
            <div>Servo Controls</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              Current Angle:
              <v-chip>
                <b>{{ servoAngle != null ? servoAngle : "N/A" }}</b>
              </v-chip>
              <v-snackbar
                v-model="warnings.servoExceeded"
                :timeout="2000"
                color="black"
              >
                <div>Servo range exceeded!</div>
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="warnings.servoExceeded = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-slider
              v-model="servoSlider"
              @change="setServoAngle(servoSlider)"
              :max="180"
              :min="0"
              step="10"
              thumb-label
              ticks
            ></v-slider>
          </v-card-actions>
          <v-card-actions class="mx-2">
            <v-btn color="" @click="incrementServoAngle(-1)">LEFT</v-btn>
            <v-btn color="primary" @click="setServoAngle(90)">RESET</v-btn>
            <v-btn color="" @click="incrementServoAngle(1)">RIGHT</v-btn>
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
            <v-btn color="" @click="startStream">Start Stream </v-btn>
            <v-btn color="red" @click="stopStream">Stop Stream </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" @click="reloadPlayer">Reload Player </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        class="mt-4"
        cols="12"
        sm="12"
        md="8"
        lg="8"
        xl="8"
        order="1"
        order-md="2"
      >
        <v-card>
          <v-card-title>
            LIVE FEED
          </v-card-title>
          <v-card-actions>
            <v-img
              src="http://localhost:8091/0/stream"
              lazy-src="https://images.unsplash.com/photo-1620125587503-54b5365229de"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import TextToSpeech from "@/components/TextToSpeech";

export default {
  name: "VideoMain",
  components: {
    TextToSpeech
  },
  data() {
    return {
      warnings: {
        servoExceeded: false,
      },
      messageText: null,
      ttsPrerecorded: true,
      speechOptions: ["A lovely evening! ", "How's it going? "],
      speechChoice: "",
      selectPrerecordedOptions: [
        { value: true, text: "Prerecorded Text" },
        { value: false, text: "Custom Text" },
      ],
      videoOptions: {
        // autoplay: 'muted',
        controls: true,
        sources: [
          {
            // Dummy MP4 url
            // src: "http://vjs.zencdn.net/v/oceans.mp4",
            // type: "video/mp4",

            // Dummy HLS url from Akamai
            // src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
            // type: "application/x-mpegURL",

            // HLS
            // src: "http://192.168.0.150:8001/live/py/index.m3u8",
            // type: "application/x-mpegURL",

            // MJPEG
            // src: "http://localhost:8091/0/stream",
            // type: "video/x-motion-jpeg",

            // DASH (disabled in media server config)
            // src: "http://192.168.0.138:8001/live/py/index.mpd",
            // type: "application/dash+xml",
          },
        ],
        fill: true,
        responsive: true,
        aspectRatio: "16:9",
      },
      servoAngle: null,
      servoSlider: null,
      incrementStep: 2,
    };
  },
  methods: {
    startStream() {
      axios
        .get("http://localhost:8000/api/stream")
        .then((response) => console.log(response));
      this.reloadPlayer();
    },
    stopStream() {
      axios
        .post("http://localhost:8000/api/stream")
        .then((response) => console.log(response));
    },
    reloadPlayer() {
      console.log("Reloading Player...");
      this.$refs.videoPlayer.player.src(this.videoOptions.sources);
      this.$refs.videoPlayer.player.load();
      this.$refs.videoPlayer.player.play();
    },
    getServoAngle() {
      axios.get("http://localhost:8000/api/servo").then((response) => {
        this.servoAngle = parseInt(response.data.angle);
        this.servoSlider = this.servoAngle;
      });
    },
    setServoAngle(angle) {
      let postUrl = "http://localhost:8000/api/servo/" + String(angle) + "/";
      axios.post(postUrl).then((response) => {
        console.log(response);
      });
      this.getServoAngle();
    },
    incrementServoAngle(dir) {
      // increment direction (1 or -1)
      let newAngle = parseInt(this.servoAngle + this.incrementStep * dir);
      if (newAngle <= 180 && newAngle >= 0) {
        this.warnings.servoExceeded = false;
        this.setServoAngle(newAngle);
      } else {
        this.warnings.servoExceeded = true;
      }
    },
  },
  mounted() {
    this.getServoAngle();
  },
};
</script>

<style scoped></style>
