<template>
  <v-card class="mb-4">
    <v-card-title>
      Voice Controls
    </v-card-title>
    <!--      one action component per v-card-actions-->
    <v-divider></v-divider>
    <v-tabs v-model="tab">
      <v-tab>
        Prerecorded
      </v-tab>
      <v-tab>
        Custom
      </v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-actions>
            <v-text-field
                v-model="speechSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-data-table
                v-model="speechChoice"
                :headers="speechHeaders"
                :items="speechOptions"
                :items-per-page="5"
                :single-select="true"
                :search="speechSearch"
                show-select
                class="elevation-1"
            >
            </v-data-table>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" @click="reuseVoiceHandler">
              PLAY
            </v-btn>
            <v-btn @click="getVoiceList">
              REFRESH
            </v-btn>
          </v-card-actions>
        </v-tab-item>
        <v-tab-item class="mx-2">
          <v-text-field
              id="textarea"
              v-model="messageText"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
          >
          </v-text-field>
          <v-btn color="primary" @click="newVoiceHandler">
            SUBMIT
          </v-btn>
          <v-btn color="">RESET</v-btn>
          <v-checkbox v-model="instantPlay" label="Play Instantly? "></v-checkbox>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "TextToSpeech",
  data() {
    return {
      tab: null,
      messageText: null,
      ttsPrerecorded: true,
      speechHeaders: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Text',
          value: 'text'
        }],
      speechOptions: [
        {
          id: null,
          text: null,
        }],
      // speechOptions: ["A lovely evening! ", "How's it going? "],
      speechChoice: null,
      speechSearch: "",
      selectPrerecordedOptions: [
        {value: true, text: "Prerecorded Text"},
        {value: false, text: "Custom Text"},
      ],
      instantPlay: false,
    }
  },
  methods: {
    reuseVoiceHandler: function () {
      //If directly playing existing voice
      let playUrl = "http://localhost:8000/voice/play/" + String(this.speechChoice[0].id) + "/"
      axios
          .post(playUrl)
          .then(function (response) {
            console.log(response)
          })
    },
    newVoiceHandler: function () {
      // Sends text for TTS
      let newFormData = new FormData();
      newFormData.append("text", this.messageText);
      newFormData.append("play", this.instantPlay);
      axios({
        method: "post",
        url: "http://localhost:8000/voice/tts/",
        data: newFormData,
        headers: {"Content-Type": "multipart/form-data"},
      })
          .then(function (response) {
            console.log(response)
          })
      this.getVoiceList();
    },
    getVoiceList: function () {
      let that = this
      axios
          .get("http://localhost:8000/voice/list/")
          .then(function (response) {
            that.speechOptions = response.data;
          })
    }
    ,
  }
  ,
  mounted() {
    this.getVoiceList();
  }
}
</script>

<style scoped>

</style>