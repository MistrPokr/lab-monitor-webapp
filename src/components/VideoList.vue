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
          text: "文件名",
          value: "name",
        },
        {
          text: "操作",
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
      axios({
        url: `/video/download/${item.name}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${item.name}.mp4`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });

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