<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col
      :span="20"
      style="border: 1px solid; border-color: rgb(235, 237, 240)"
    >
      <a-form :layout="layout" :model="form">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="14">
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
            <a-form-item>
              <a-input> </a-input>
            </a-form-item>
            <!-- <a-page-header title="Headers"></a-page-header>
            <a-divider />
            <a-form-item>
              <a-input> </a-input>
            </a-form-item> -->

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
          <!-- <ul>
            <li v-for="(value, name) in response_data" :key="value">
              {{ name }}:{{ value }}
            </li>
          </ul> -->
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
export default {
  name: "Disruptor",
  components: {},
  data() {
    return {
      showPage: false,
      layout: "horizontal",
      form: {
        url: "https://jsonplaceholder.typicode.com/todos/1",
        method: "get",
      },
      response_data: "",
      request_data: "",
    };
  },
  /*
TODO:
component{
  add button input delete button
}
function{
  request function 7/10done
  print out header
}

*/

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
			"Accept": response.config.headers["Accept"]
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
