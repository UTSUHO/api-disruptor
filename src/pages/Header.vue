<template>
  <a-layout-header style="height:8vh;">
    <a-page-header
      title="API Disruptor"
      @back="() => null"
      style="padding: 1em 0 0;height:2vh;"
    >
      <template v-slot:backIcon>
        <img src="../../public/disruptor32.png" />
      </template>
    </a-page-header>
  </a-layout-header>
</template>
<!-- "<img src= '../../public/disruptor.png' >" -->

<script>
export default {};
</script>

<style>
.ant-page-header-heading-title{
  margin: 8px 0 0;
}

</style>