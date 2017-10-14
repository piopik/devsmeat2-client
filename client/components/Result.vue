<template>
  <div class="result"  v-bind:class="{ 'result--active' : active } ">
    <h2 class="result__h2">{{ (correct ? 'GOOD!' : 'WRONG!' ) }}</h2>
    <h3 class="result__h3" v-if="correct === false">It can only get better ;)</h3>
    <h3 class="result__h3" v-if="correct && points === 0">Unfortunately other players were faster :(.</h3>
    <h3 class="result__h3" v-if="correct && points > 0">You've gained <span class="result__bold">{{points}}</span> {{ ( points>1 ? 'points' : 'point' ) }}!</h3>
  </div>
</template>

<script>
  export default{
    props: ['active', 'correct', 'points']
  }
</script>

<style lang="less">
  @import './../styles/variables.less';

  .result{

    color: @white;
    text-align:center;
    opacity:0;
    transition: opacity .2s @transition-ease;

    &__h2 {
      font-size: 3em;
      margin:0;
      font-weight:700;
    }

    &__h3 {
      margin:0;
      font-weight:300;
    }

    &__bold {
      font-weight:700;
    }

    &:before{
      position: absolute;
      content: '';
      width: 300px;
      height: 300px;
      background: red;
      top: 50%;
      left: 50%;
      margin-left:-150px;
      margin-top:-150px;
      transform: scale(0);
      opacity: 1;
      transition: all 1s linear;
      z-index: -1;
      border-radius: 50%;
    }

    &--active{
      opacity:1;

      &:before{
        transform: scale(1);
        opacity: 0;
      }
    }
  }
</style>
