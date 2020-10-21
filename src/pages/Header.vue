<template>
  <a-layout-header style="height:82px;">
    <a-page-header
      title="API Disruptor"
      @back="() => null"
      style="padding: 1em 0 0;"
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