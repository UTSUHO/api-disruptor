<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col
      :span="20"
      style="border: 1px solid; border-color: rgb(235, 237, 240)"
    >
      <a-form :layout="form.layout" :model="form">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="14">
            <a-form-item>
              <a-input
                v-model:value="value"
                placeholder="?query string"
                size="large"
                @search="onSearch"
              >
                <template v-slot:addonBefore>
                  <a-select v-model:value="protocolMethod" style="width: 90px">
                    <a-select-option value="GET"> GET </a-select-option>
                    <a-select-option value="POST"> POST </a-select-option>
                    <a-select-option value="PUT"> PUT </a-select-option>
                    <a-select-option value="DELETE"> DELETE </a-select-option>
                  </a-select>
                </template>
              </a-input>
            </a-form-item>

            <a-page-header title="Query params!"></a-page-header>
            <a-divider />
            <a-form-item>
              <a-input> </a-input>
            </a-form-item>
            <a-page-header title="Headers"></a-page-header>
            <a-divider />
            <a-form-item>
              <a-input> </a-input>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" shape="round"> Fetch！ </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>

  <a-row type="flex" justify="center" align="middle">
    <a-col :span="10">
      <a-card title="Response">
        <div>Response data</div>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card title="Request">
        <div>Request data</div>
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
      protocolMethod: "GET",
      form: {
        layout: "horizontal",
        fieldA: "",
        fieldB: "",
      },
    };
  },
  /*
TODO:
component{
  add button input delete button
}
function{
  request function
  show data function
}
*/
  method: {
    disrupt(target_API_config) {
      //pack axios request funtion
      this.axios.request(target_API_config).then((response) => {
        const responseData = response;
        console.log(responseData);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
