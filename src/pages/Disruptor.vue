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

            <a-page-header title="Query params!"></a-page-header>
            <a-divider />
            <!-- 可视化组件 -->
            <!-- <input-list @child-dr="parentDR"></input-list> -->
            <a-form-item>
              <a-input v-model:value="inputData" @blur="formatString"></a-input>
            </a-form-item>

            <!-- <a-page-header title="Headers"></a-page-header>
            <a-divider />
            <a-form-item>
              <a-input> </a-input>
            </a-form-item> -->
            <a-divider />

            <a-form-item>
              <a-button type="primary" shape="round" @click="disrupt">
                Fetch！
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" align="top">
    <a-col :span="10">
      <a-card title="Response">
        <div v-if="showPage">
          <pre>{{ response_data }}</pre>
        </div>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card title="Request">
        <div v-if="showPage">
          <!-- <pre>{{ request_data }}</pre> -->

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
export default {
  name: "Disruptor",
  components: {
    //   可视化组件
    // inputList,
  },
  data() {
    return {
      inputData: "",
      checkedData: [],
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
          };
          this.showPage = true;
          console.log(this.request_data);
          console.log(2);
        })
        .catch((err) => {
          console.log({ err });
          this.response_data = JSON.stringify(err.response.headers);
          this.request_data = JSON.stringify({
            Method: err.response.config.method,
            URL: err.request.responseURL,
            "Content-type": err.response.headers["content-type"],
          });
          console.log(err.response);
          console.log(this.request_data);
          this.showPage = true;
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
    formatString() {
      var strBuffer = "";
      //   console.log(this.inputData);
      if (this.form.url.includes("?")) {
        this.form.url = this.form.url.slice(0, this.form.url.indexOf("?") + 1);
      } else {
        this.form.url += "?";
      }
      if (this.inputData == "") {
        return;
      }
      const objInput = JSON.parse(this.inputData);
      //   console.log(objInput);

      Object.keys(objInput).forEach(function (key) {
        strBuffer = strBuffer + key + "=" + objInput[key] + "&";
      });

      this.form.url += strBuffer;
      this.form.url=this.form.url.substring(0, this.form.url.length - 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
