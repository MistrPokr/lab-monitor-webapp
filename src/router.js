import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "homeView",
            component: () => import("./views/Home")
        },
        {
            path: "/login",
            name: "userView",
            component: () => import("./views/User"),
        }]
})
