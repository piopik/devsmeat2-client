<template>
  <div class="timer">
    <div class="timer__marker" v-bind:style="{ transform :  'scaleX(' + value/max + ')' }"></div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'max']
  }
</script>

<style lang="less" scoped>
  @import './../styles/variables.less';

  .timer{
    width: 100vw;
    height: 5px;
    position: fixed;
    top:0;

    &__marker{
      position: absolute;
      height: 5px;
      width: 100%;
      background: @rose;

      transition: transform .2s @transition-ease;
      transform-origin: 0 50%;
    }
  }
</style>
