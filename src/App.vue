<template>
  <!-- App.vue -->

  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="drawerGroup"
            active-class="teal--text text--accent-4"
            color="teal"
        >
          <v-list-item @click="()=>{this.$router.push('/')}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>主页</v-list-item-title>
          </v-list-item>

          <v-list-item @click="()=>{this.$router.push('/videos')}">
            <v-list-item-icon>
              <v-icon>mdi-video-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>历史视频</v-list-item-title>
          </v-list-item>

          <v-list-item @click="()=>{this.$router.push('/full')}">
            <v-list-item-icon>
              <v-icon>mdi-video-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>全屏监控</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="teal"
        dark
        hide-on-scroll
    >
      <v-app-bar-nav-icon
          @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Lab Eye</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    drawerGroup: null,
  }),
};
</script>
