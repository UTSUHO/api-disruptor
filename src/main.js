import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.less';
import Axios from 'axios';
const app = createApp(App)

app.use(Antd)

app.config.globalProperties.$axios = Axios

app.mount('#app')
