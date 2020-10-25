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
              <a-input-search
                v-model:value="form.url"
                placeholder="?query string"
                size="large"
                style="margin: 2em 0 1em"
                @search="disrupt"
              >
                <template v-slot:addonBefore>
                  <a-select v-model:value="form.method" style="width: 90px">
                    <a-select-option value="get"> GET </a-select-option>
                    <a-select-option value="post"> POST </a-select-option>
                    <a-select-option value="put"> PUT </a-select-option>
                    <a-select-option value="delete"> DELETE </a-select-option>
                  </a-select>
                </template>
                <template v-slot:enterButton>
                  <a-button type="primary" :loading="loading">
                    Fetch！
                  </a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <h1>
              Query params:
              <!-- Input Example Code Style -->
              <!-- <span class="expectedInput">Expected Input: </span>
                  <span
                    ><code class="inputExample">json:{'a':b','c':'d'}</code> /
                    <code class="inputExample">a:b,c:d</code> /
                    <code class="inputExample">JS object:{a:b,c:d}</code></span
                  > -->
            </h1>
            <a-divider />
            <!-- 可视化组件事件入口 -->
            <!-- <input-list @child-dr="parentDR"></input-list> -->
            <div>
              <a-form-item>
                <a-textarea
                  v-model:value="inputParam"
                  :rows="4"
                  @blur="dynamicStringMapping"
                  placeholder="Expected Input:	json:{'a':b','c':'d'}	/	a:b,c:d	/	JS object:{a:b,c:d}"
                />
              </a-form-item>
            </div>
            <a-divider />
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" align="top">
    <a-col :span="20">
      <a-card bodyStyle="overflow:auto;max-height:40vh"
        ><template v-slot:title> Card:{{ cardName }} </template>
        <template v-slot:extra>
          <a-button type="primary" @click="changeCard">
            change to {{ targetCard }}
          </a-button>
          <a-button type="primary" ghost="true" @click="copyData">
            <template v-slot:icon> <CopyFilled /></template>
          </a-button>
        </template>
        <div style="overflow: auto">
          <pre>{{ dataShowcase }}</pre>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
//可视化组件
// import inputList from "../components/inputList.vue";
import { CopyFilled } from "@ant-design/icons-vue";

export default {
  name: "Disruptor",
  components: {
    CopyFilled,

    //   可视化组件
    // inputList,
  },
  data() {
    return {
      message: "copy the text",
      cardName: "Response",
      targetCard: "Request",
      inputParam: "",
      checkedData: [],
      loading: false,
      layout: "horizontal",
      form: {
        url: "https://jsonplaceholder.typicode.com/comments",
        method: "get",
        data: {},
      },

      response_data: "",
      request_data: "",
      dataShowcase: "",
    };
  },
  methods: {
    //pack axios request funtion
    async disrupt() {
      this.loading = true;
      this.$axios
        .request(this.form)
        .then((response) => {
          this.response_data = JSON.stringify(response.data, null, 4);
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
          // this.showPage = true;
          if (this.cardName === "Response") {
            this.dataShowcase = this.response_data;
          } else {
            this.dataShowcase = this.request_data;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.response_data = JSON.stringify(err.response.headers);
          this.request_data = {
            Method: err.response.config.method,
            URL: err.request.responseURL,
            "Content-type": err.response.headers["content-type"],
          };

          // this.showPage = true;
          this.loading = false;
        });
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
        this.dataShowcase = this.request_data;
        this.cardName = "Request";
        this.targetCard = "Response";
      } else {
        this.dataShowcase = this.response_data;
        this.cardName = "Response";
        this.targetCard = "Request";
      }
    },
    copyData() {
      let bufferData = "";
      if (this.dataShowcase === "") {
        alert("there is nothing to copy");
        return;
      } else if (this.cardName === "Request") {
        bufferData = JSON.stringify(this.dataShowcase);
      } else {
        bufferData = this.dataShowcase;
      }
      let transfer = document.createElement("input");
      document.body.appendChild(transfer);
      transfer.value = bufferData; // copy target
      transfer.focus();
      transfer.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        alert("copy success");
      } else {
        alert("copy failed");
      }
      transfer.blur();
      document.body.removeChild(transfer);
    },
    // get mapping handler
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
    // post/put/delete/patch handler
    formatInputData() {
      if (this.formatInput(this.inputParam) != undefined) {
        this.form.data = this.formatInput(this.inputParam);
      }
    },
    dynamicStringMapping() {
      console.log("happened");
      if (this.form.method === "get") {
        this.formatInputParam();
        if (this.form.url.includes("[object Object]")) {
          alert("js object mapping won't be supported for get function");
        }
      } else {
        this.formatInputData();
      }
    },
    formatInput(inputString) {
      // @return js object or undefined
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
          inputString = inputString.replace(/'/g, "");
          inputString = inputString.replace(/"/g, "");
          items = inputString.split(",");
          console.log(items);
          for (var x = 0; x < items.length; x++) {
            var current = items[x].split(":");
            console.log(current);
            console.log(current[1][current[1].length - 1]);
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
              // dealing with nesting
            } else if (current[0][0] === "{") {
              bufferString +=
                "{" +
                '"' +
                current[0].substring(1, current[0].length) +
                '":"' +
                current[1] +
                '",';
            } else if (current[1][current[1].length - 1] === "}") {
              bufferString +=
                '"' +
                current[0] +
                '":"' +
                current[1].substring(0, current[1].length - 1) +
                '"},';
            } else if (typeof current[2] !== "undefined") {
              if (current[2].includes("}}")) {
                bufferString +=
                  '"' +
                  current[0] +
                  '":{"' +
                  current[1].substring(1, current[1].length) +
                  '":"' +
                  current[2].substring(0, 1) +
                  '"}},';
              } else {
                bufferString +=
                  '"' +
                  current[0] +
                  '":{"' +
                  current[1].substring(1, current[1].length) +
                  '":"' +
                  current[2].substring(0, 1) +
                  '"},';
              }
            } else {
              bufferString += '"' + current[0] + '":"' + current[1] + '",';
            }
          }
          bufferString = bufferString.substr(0, bufferString.length - 1);
          console.log(bufferString);
          return (objInput = JSON.parse(bufferString));
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
h1 {
  text-align: left;
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
