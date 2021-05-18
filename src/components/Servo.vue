<template>
  <v-card class="mb-4">
    <v-card-title>
      <div>Servo Controls</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div>
        Current Angle:
        <v-chip>
          <b>{{ servoAngle != null ? servoAngle : "N/A" }}</b>
        </v-chip>
        <v-snackbar
            v-model="warnings.servoExceeded"
            :timeout="2000"
            color="black"
        >
          <div>Servo range exceeded!</div>
          <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="warnings.servoExceeded = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-slider
          v-model="servoSlider"
          @change="setServoAngle(servoSlider)"
          :max="180"
          :min="0"
          step="10"
          thumb-label
          ticks
      ></v-slider>
    </v-card-actions>
    <v-card-actions class="mx-2">
      <v-btn color="" @click="incrementServoAngle(-1)">LEFT</v-btn>
      <v-btn color="primary" @click="setServoAngle(90)">RESET</v-btn>
      <v-btn color="" @click="incrementServoAngle(1)">RIGHT</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Servo",
  data() {
    return {
      warnings: {
        servoExceeded: false,
      },
      servoAngle: null,
      servoSlider: null,
      incrementStep: 2,
    }
  },
  methods: {
    getServoAngle() {
      axios.get("http://localhost:8000/api/servo").then((response) => {
        this.servoAngle = parseInt(response.data.angle);
        this.servoSlider = this.servoAngle;
      });
    },
    setServoAngle(angle) {
      let postUrl = "http://localhost:8000/api/servo/" + String(angle) + "/";
      axios.post(postUrl).then((response) => {
        console.log(response);
      });
      this.getServoAngle();
    },
    incrementServoAngle(dir) {
      // increment direction (1 or -1)
      let newAngle = parseInt(this.servoAngle + this.incrementStep * dir);
      if (newAngle <= 180 && newAngle >= 0) {
        this.warnings.servoExceeded = false;
        this.setServoAngle(newAngle);
      } else {
        this.warnings.servoExceeded = true;
      }
    },
  },
  mounted() {
    this.getServoAngle();
  },
}
</script>

<style scoped>

</style>