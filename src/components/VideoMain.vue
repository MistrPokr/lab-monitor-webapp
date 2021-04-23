<template>
  <div>
    <video-player :options="videoOptions"/>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";

export default {
  name: "VideoMain",
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [{
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          type:"video/mp4",
          // src: "http://192.168.0.138:8001/live/py/index.mpd",
          // type: "application/dash+xml",
          // src: "http://192.168.0.138:8001/live/py/index.m3u8",
          // type: "application/x-mpegURL",
        }]
      }
    }
  }

}
</script>

<style scoped>

</style>