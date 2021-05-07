<template>
  <v-card class="mb-4">
    <v-card-title>
      Voice Controls
    </v-card-title>
    <!--      one action component per v-card-actions-->
    <v-divider></v-divider>
    <v-card-actions class="mx-2">
      <v-form>
        <v-select
            v-model="ttsPrerecorded"
            :items="selectPrerecordedOptions"
            item-text="text"
            item-value="value"
        >
        </v-select>
        <div v-if="!ttsPrerecorded">
          <v-text-field
              id="textarea"
              v-model="messageText"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
          >
          </v-text-field>
          <v-btn color="primary" @click="voiceHandler">
            SUBMIT
          </v-btn>
          <v-btn color="">RESET</v-btn>
          <v-checkbox v-model="instantPlay" label="Play Instantly? "></v-checkbox>
        </div>
        <div v-else>
          <v-card-actions>
            <v-radio-group v-model="speechChoice">
              <v-radio
                  v-for="str in speechOptions"
                  :key="str"
                  :label="str"
                  :value="str"
              >
              </v-radio>
            </v-radio-group>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="primary" @click="voiceHandler">
              PLAY
            </v-btn>
          </v-card-actions>
        </div>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "TextToSpeech",
  data() {
    return {
      messageText: null,
      ttsPrerecorded: true,
      speechOptions: ["A lovely evening! ", "How's it going? "],
      speechChoice: "",
      selectPrerecordedOptions: [
        {value: true, text: "Prerecorded Text"},
        {value: false, text: "Custom Text"},
      ],
      instantPlay: false,
    }
  },
  methods: {
    voiceHandler: function () {
      if (this.ttsPrerecorded) {
        //Use prerecorded voice or upload file
        axios
            .post()
            .then()
      } else {
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
      }
    }
  }
}
</script>

<style scoped>

</style>