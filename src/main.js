import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import SimpleTextSetting from "./components/SimpleText/SimpleTextSetting.vue";

const app = createApp(App, {});
app.use(store);
app.mount("#app");
app.component(SimpleTextSetting);
