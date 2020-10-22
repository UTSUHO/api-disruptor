<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col
      :span="20"
      style="border: 1px solid; border-color: rgb(235, 237, 240)"
    >
      <a-form :layout="layout" :model="form">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="18">
            <a-form-item>
              <a-input
                v-model:value="form.url"
                placeholder="?query string"
                size="large"
                style="margin: 2em 0 1em"
              >
                <template v-slot:addonBefore>
                  <a-select v-model:value="form.method" style="width: 90px">
                    <a-select-option value="get"> GET </a-select-option>
                    <a-select-option value="post"> POST </a-select-option>
                    <a-select-option value="put"> PUT </a-select-option>
                    <a-select-option value="delete"> DELETE </a-select-option>
                  </a-select>
                </template>
              </a-input>
            </a-form-item>
            <div v-if="form.method === 'get' ? true : false">
              <a-page-header title="Query params!">
                <span class="expectedInput">Expected Input: </span>
                <span
                  ><code class="inputExample">json:{'a':b','c':'d'}</code> /
                  <code class="inputExample">a:b,c:d</code> /
                  <code class="inputExample">JS object:{a:b,c:d}</code></span
                >
              </a-page-header>
              <a-divider />
              <!-- 可视化组件 -->
              <!-- <input-list @child-dr="parentDR"></input-list> -->
              <a-form-item>
                <a-input
                  v-model:value="inputParam"
                  @blur="formatInputParam"
                ></a-input>
              </a-form-item>
            </div>
            <div v-if="form.method === 'get' ? false : true">
              <a-page-header title="Body"> </a-page-header>
              <a-divider />
              <a-form-item>
                <a-textarea
                  v-model:value="inputData"
                  placeholder="body"
                  :rows="4"
                  @blur="formatInputData"
                />
              </a-form-item>
            </div>
            <!-- <a-page-header title="Headers"></a-page-header>
            <a-divider />
            <a-form-item>
              <a-input> </a-input>
            </a-form-item> -->
            <a-divider />

            <a-form-item>
              <a-button
                type="primary"
                shape="round"
                @click="disrupt"
                :loading="loading"
              >
                Fetch！
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" align="top">
    <a-col :span="20">
      <a-card
        title="Response"
        bodyStyle="overflow:auto;height:40vh"
        v-if="cardName === 'Response' ? true : false"
      >
        <template v-slot:extra>
          <a-button type="primary" shape="circle" @click="changeCard">
            <template v-slot:icon><SyncOutlined /></template>
          </a-button>
        </template>
        <div v-if="showPage" style="overflow: auto">
          <pre>{{ response_data }}</pre>
        </div>
      </a-card>

      <a-card title="Request" v-if="cardName === 'Request' ? true : false">
        <template v-slot:extra>
          <a-button
            type="primary"
            shape="circle"
            ghost="true"
            @click="changeCard"
          >
            <template v-slot:icon><SyncOutlined /></template>
          </a-button>
        </template>
        <div v-if="showPage">
          <ul>
            <li v-for="(value, name) in request_data" :key="value">
              {{ name }}:{{ value }}
            </li>
          </ul>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
//可视化组件
// import inputList from "../components/inputList.vue";
import { SyncOutlined } from "@ant-design/icons-vue";

export default {
  name: "Disruptor",
  components: {
    SyncOutlined,
    //   可视化组件
    // inputList,
  },
  data() {
    return {
      cardName: "Response",
      inputParam: "",
      inputData: "",
      checkedData: [],
      loading: false,
      showPage: false,
      layout: "horizontal",
      form: {
        url: "https://jsonplaceholder.typicode.com/comments",
        method: "get",
        data: {},
      },

      response_data: "",
      request_data: "",
    };
  },
  computed: {
    // url() {
    //   var url = "";
    //   var strBuffer = "";
    //   if (this.checkedData.length == 0) {
    //     return url;
    //   } else {
    //     for (let i = 0; i < this.checkedData.length; ++i) {
    //       if (!this.checkedData[i].checked) {
    //         strBuffer =
    //           this.checkedData[i].key + "=" + this.checkedData[i].value;
    //       }
    //     }
    //   }
    //   url = url + "?" + strBuffer;
    //   console.log(this.checkedData);
    //   return url;
    // },
  },

  methods: {
    async disrupt() {
      this.loading = true;
      //pack axios request funtion
      console.log(1);
      this.$axios
        .request(this.form)
        .then((response) => {
          this.response_data = JSON.stringify(response.data);
          this.request_data = {
            Method: response.config.method,
            URL: response.config.url,
            Accept: response.config.headers["Accept"],
            "Content-Type": response.config.headers["Content-Type"],
            data: response.config.data,
            maxBodyLength: response.config.maxBodyLength,
            maxContentLength: response.config.maxContentLength,
            timeout: response.config.timeout,
            xsrfCookieName: response.config.xsrfCookieName,
            xsrfHeaderName: response.config.xsrfHeaderName,
          };
          this.showPage = true;
          this.loading = false;
          console.log(this.request_data);
          console.log(2);
        })
        .catch((err) => {
          console.log({ err });
          this.response_data = JSON.stringify(err.response.headers);
          this.request_data = {
            Method: err.response.config.method,
            URL: err.request.responseURL,
            "Content-type": err.response.headers["content-type"],
          };
          console.log(err.response);
          console.log(this.request_data);
          this.showPage = true;
          this.loading = false;
          console.log(3);
        });
      console.log(4);
    },
    // 可视化组件配套函数
    // parentDR(childData) {
    //   this.checkedData = childData;
    //   // if last char is not equal to question mark "?"
    //   if (!this.form.url.includes("?")) {
    //     this.form.url += "?";
    //     this.launch();
    //   } else {
    //     //cut off already loaded data
    //     this.form.url = this.form.url.slice(0, this.form.url.indexOf("?") + 1);
    //     this.launch();
    //   }
    // },
    // launch() {
    //   // refresh checked data
    //   var strBuffer = "";
    //   for (let i = 0; i < this.checkedData.length; ++i) {
    //     if (this.checkedData[i].checked) {
    //       strBuffer =
    //         strBuffer +
    //         this.checkedData[i].key +
    //         "=" +
    //         this.checkedData[i].value;
    //       if (i < this.checkedData.length - 1) {
    //         strBuffer += "&";
    //       }
    //     }
    //   }
    //   this.form.url += strBuffer;
    // },
    changeCard() {
      if (this.cardName === "Response") {
        this.cardName = "Request";
      } else {
        this.cardName = "Response";
      }
    },
    formatInputParam() {
      var strBuffer = "";
      if (this.formatInput(this.inputParam) === undefined) {
        return;
      }
      var objInput = this.formatInput(this.inputParam);
      //   add question mark
      if (this.form.url.includes("?")) {
        this.form.url = this.form.url.slice(0, this.form.url.indexOf("?") + 1);
      } else {
        this.form.url += "?";
      }
      Object.keys(objInput).forEach(function (key) {
        strBuffer = strBuffer + key + "=" + objInput[key] + "&";
      });

      this.form.url += strBuffer;
      this.form.url = this.form.url.substring(0, this.form.url.length - 1);
    },
    formatInputData() {
      if (this.formatInput(this.inputData) != undefined) {
        this.form.data = this.formatInput(this.inputData);
      }
    },
    formatInput(inputString) {
      // @return js object or null
      var objInput = {};
      var items;
      var bufferString = "";
      inputString = inputString.replace(/\s/g, "");
      if (inputString == "") {
        return;
      }
      //   console.log(this.inputParam);

      //	handler for json and different input format
      if (this.isJson(inputString)) {
        return (objInput = JSON.parse(inputString));
        //	if it's a key:value structure
      } else if (inputString.includes(":")) {
        //	if it's key:value without curly braces
        //	a:b,c:d
        if (!inputString.includes("{")) {
          items = inputString.split(",");
          var i;
          for (i in items) {
            items[i] = items[i].split(":");
            objInput[items[i][0]] = items[i][1];
          }
          return objInput;
          //this one for js object direct input
          // { a:b,c:d }
        } else {
          items = inputString.split(",");
          for (var x = 0; x < items.length; x++) {
            var current = items[x].split(":");
            if (
              current[0][0] === "{" &&
              current[1][current[1].length - 1] === "}"
            ) {
              bufferString +=
                "{" +
                '"' +
                current[0].substring(1, current[0].length) +
                '":"' +
                current[1].substring(0, current[1].length - 1) +
                '"},';
            } else {
              bufferString += '"' + current[0] + '":"' + current[1] + '",';
            }
          }
          return (objInput = JSON.parse(
            (bufferString = bufferString.substr(0, bufferString.length - 1))
          ));
        }
      } else {
        return;
      }
    },
    isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expectedInput {
  display: block;
}
.inputExample {
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  display: inline-block;
}
.ant-card-body {
  overflow: auto;
  max-height: 40vh;
}
h3 {
  margin: 40px 0 0;
}

pre {
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 2em;
}
ul {
  list-style-type: none;
  text-align: left;
  padding: 0;
}
li {
  /* display: inline-block; */
  list-style-type: none;

  margin: 0 px;
}
a {
  color: #42b983;
}
</style>
