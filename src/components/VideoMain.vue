<template>
  <div class="row mt-4">
    <div class="col ml-4">
      <b-card>
        <b-form>
          <b-form-group id="" label="" label-for="">
            <b-form-textarea
                id="textarea"
                v-model="messageText"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
            >
            </b-form-textarea>
            <b-form-radio-group
                id="radio-group"
                name="radio-options"
                :options="radioOptions"
            ></b-form-radio-group>
          </b-form-group>
        </b-form>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-card>
      <b-card>
        <p>Current Angle:
          <span class="badge badge-success">4</span>
        </p>
        <b-button-group size="sm">
          <b-button>Rotate Left</b-button>
          <b-button variant="primary"> Reset</b-button>
          <b-button>Rotate Right</b-button>
        </b-button-group>
      </b-card>
      <b-card>
        <div>
          LIVE
        </div>
        <b-button-group size="sm">
          <!--          TODO Whole card changes color on stream status change; e.g. Red on live stream. -->
          <b-button @click="startStream">
            Start Stream
          </b-button>
          <b-button @click="stopStream" variant="danger">
            Stop Stream
          </b-button>
        </b-button-group>
        <div>
          <b-button @click="reloadPlayer" variant="primary" size="sm">Reload Player</b-button>
        </div>
      </b-card>
    </div>
    <div class="col-8 mr-4">
      <video-player class="vjs-big-play-centered" ref="videoPlayer" :options="videoOptions"/>
    </div>
  </div>
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
      radioOptions: [
        {text: 'Male Voice', value: 'male1'},
        {text: 'Female Voice', value: 'female1'},
      ],
      videoOptions: {
        // autoplay: 'muted',
        controls: true,
        sources: [{
          // src: "http://vjs.zencdn.net/v/oceans.mp4",
          // type: "video/mp4",
          src: "http://192.168.0.138:8001/live/py/index.m3u8",
          type: "application/x-mpegURL",
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