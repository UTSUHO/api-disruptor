import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.less';
import Axios from 'axios';
// import VueClipboard from 'vue-clipboard2';
const app = createApp(App)

app.use(Antd)
// app.use(VueClipboard)

Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // localStorage.clear()
    return config;

}, function (error) {
    // Do something with request error
    // console.log("request error:")
    // console.log(error.toJSON())
    return Promise.reject(error);
});

//Add a response interceptor
Axios.interceptors.response.use((response) => {
    // Do something with response data
    // console.log("response interceptors:")
    // console.log(response)
    // localStorage.setItem('response',response)


    return response;
}, (error) => {
    // Do something with response error
    // console.log("response error:")
    // console.log({error})
    // localStorage.setItem('response',JSON.parse(JSON.stringify(error)))
    // console.log(localStorage.getItem('response'))
    // console.log(JSON.parse(JSON.stringify(error)));
    //   const response=JSON.parse(JSON.stringify(error)).response;
    //   console.log({response});
    //   const text = response.status;
    //  console.log(text)
    return Promise.reject(error);
});
app.config.globalProperties.$axios = Axios

app.mount('#app')
