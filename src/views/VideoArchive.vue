<template>
  <v-container fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <video-list></video-list>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import VideoList from "@/components/VideoList";

export default {
  name: "VideoArchive",
  components: {VideoList}
}
</script>

<style scoped>

</style>