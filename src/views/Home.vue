<template>
  <v-container fluid className="grey lighten-5 mb-6">
    <!--    TODO Move video player to top for sm/md views-->
    <v-row>
      <v-col
          className="mt-4"
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
          order="12"
          order-md="1"
      >
        <servo></servo>
        <text-to-speech></text-to-speech>
        <stream></stream>

      </v-col>
      <v-col
          className="mt-4"
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
          order="1"
          order-md="2"
      >
        <live-player></live-player>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextToSpeech from "@/components/TextToSpeech";
import Servo from "@/components/Servo";
import Stream from "@/components/Stream";
import LivePlayer from "@/components/LivePlayer";

export default {
  name: "Home",
  components: {
    LivePlayer,
    Stream,
    Servo,
    TextToSpeech
  },
  data() {
    return {};
  },

};
</script>

<style scoped></style>
