<template>
  <div>
    <v-container fluid>
      <v-row class="">
        <v-spacer></v-spacer>
        <v-col
            cols="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
        >
          <v-card class="mx-4">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-card-actions>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Username"
                    required
                ></v-text-field>
              </v-card-actions>
              <v-card-actions>
                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.required"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    counter
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-card-actions>
              <v-card-actions>
                <v-btn color="primary" @click.prevent="" block="block" type="submit">Sign in</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        // min: v => v.length >= 8 || 'Min 8 characters',
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    }
  },
  methods: {
    submitSignIn() {
      let loginFormData = new FormData();
      loginFormData.append("username", this.username);
      loginFormData.append("password", this.password);
      axios({
        method: "post",
        url: "",
        data: loginFormData,
        headers: {"Content-Type": "multipart/form-data"},
      })
          .then(function (response) {
            console.log(response);
          })
    },
  }
}
</script>

<style scoped>

</style>