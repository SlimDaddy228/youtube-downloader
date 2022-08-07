import Vue from 'vue'
import VueRouter from "vue-router";
import {ROUTES as routes} from "@/const/routes";

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes
})