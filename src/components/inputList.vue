<template>
  <div class="root-container">
    <div ref="listNode">
      <div class="inputList" v-for="key in listMap" :key="key">
        <input
          v-model="key.checked"
          type="checkbox"
          class="btnCheckbox"
          @change="change"
        />
        <input v-model="key.key" ref="input" placeholder="key" />
        <input v-model="key.value" ref="input" placeholder="value" />
      </div>
    </div>

    <div class="buttonDiv" @click="addInputList">add query parameter</div>
  </div>
</template>

<script>
export default {
  name: "inputList",
  data() {
    return {
      //   showPage: false,

      listMap: [
        {
          checked: false,
          key: "key",
          value: "value",
        },
      ],
      listBuffer:[],
    };
  },
  methods: {
    addInputList() {
      // this.showPage = true;
      this.listMap.push({
        checked: false,
        key: "key",
        value: "value",
      });
    },
    change() {
        
      this.$emit("child-dr", this.listMap);
    },
  },
};
</script>

<style>
</style>