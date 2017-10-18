<template>
  <div v-if="data.length" class="toaster" >
    <div class="toast" v-for="toast in data">
      <div class="text" v-bind:style="{ background : toast.color }">{{ toast.text }}</div>
      <img class="icon" v-bind:src=" '/img/' + toast.icon + '.svg' ">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style lang="less" scoped>
  @import './../styles/variables.less';

  .toaster{
    position: fixed;
    top: 25px;
    right: 20px;

    .toast {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      height : 30px;
      margin-bottom: 10px;
    }

    .icon {
      width : 30px;
      height : 30px;

      margin-left : 5px;
    }

    .text {
      padding: 5px 10px;

      text-transform: capitalize;
      border-radius: @border-radius;
    }
  }
</style>
