<template>
  <v-card>
    <v-card-title>
      视频列表
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-data-table
          v-model="selectedVideo"
          :headers="tableHeaders"
          :items="videoList"
          single-select
          show-select
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="downloadVideo(item)"
          >
            mdi-download
          </v-icon>
          <v-icon
              small
              @click="deleteVideo(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "VideoList",
  data() {
    return {
      selectedVideo: null,
      videoList: [
        {
          name: null,
        }
      ],
      tableHeaders: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Actions",
          value: "actions",
        },
        // {
        //   text: "Date & Time",
        //   value: "datetime"
        // }
      ]
    }
  },
  methods: {
    updateVideoList: function () {
      let that = this;
      axios
          .get("/video/list/")
          .then(function (response) {
            that.videoList = response.data;
          })
    },
    downloadVideo: function (item) {
      console.log(item.name);
    },
    deleteVideo: function (item) {
      console.log(item.name);
    }
  },
  mounted() {
    this.updateVideoList();
  }
}
</script>

<style scoped>

</style>