// File: main.js
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // Correct import statement
import Toasted from "vue-toasted";
import moment from "moment";

const opts = {
  icons: {
    iconfont: "mdi",
  },
};

Vue.use(require("vue-moment"));
Vue.use(vuetify); // Use the correct import
Vue.config.productionTip = false;

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

Vue.use(Toasted, {
  duration: 1500,
});

new Vue({
  render: (h) => h(App),
  vuetify,
}).$mount("#app");
