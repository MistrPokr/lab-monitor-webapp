<template>
  <v-card>
    <v-card-title>
      LIVE FEED
    </v-card-title>
    <v-card-actions>
      <v-img
          :src="streamSource"
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
</template>

<script>
import urls from "@/urls";

export default {
  name: "LivePlayer",
  data() {
    return {
      streamSource: urls.defaultDomain + ":8091" + "/0/stream/",
    }
  }
}
</script>

<style scoped>

</style>