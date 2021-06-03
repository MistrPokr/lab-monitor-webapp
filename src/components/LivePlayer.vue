<template>
  <v-card>
    <v-container class="pa-0" fluid>
      <v-card-title>
        <v-row>
          <v-col>直播画面</v-col>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-btn class="float-right px-1" @click="reloadPage">重载页面</v-btn>
            <v-btn class="float-right px-1" @click="()=>{this.$router.push('/full')}">全屏视图</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-container>
    <v-divider></v-divider>
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
  },
  methods: {
    reloadPage() {
      this.$router.go(0); // Reloads page
    }
  }
}
</script>

<style scoped>

</style>