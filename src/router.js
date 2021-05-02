import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
        path: "/",
        name: "mainVideoView",
        component: () => import("./components/VideoMain")
    },
        {
            path: "/vuetify",
            name: "vuetifyView",
            component: () => import("./components/vuetifyView")
        },]
})
