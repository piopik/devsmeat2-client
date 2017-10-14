<template>
  <div class="card-question" v-bind:class="{ 'card--left' : state.left , 'card--right' : state.right }" >
    <div class="card-question__header">
      <div class="card-question__label">QUESTION</div>
      <div class="card-question__question">{{question}}</div>
    </div>
    <div class="card-question__body">
      <ul class="card-question__answers">
        <li v-for="answer in answers">
          <a v-on:click="sendAnswer(answer.id)">
            {{ answer.answer }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['state', 'question', 'answers', 'sendAnswer']
  }
</script>

<style lang="less">
  @import './../styles/variables.less';
  @import './../styles/card.less';

  .card-question{
    &:extend(.card);

    &__header {
      &:extend(.card__header);
      background: @rose;
      color: @white;
    }

    &__label{
      font-weight: 300;
      margin-bottom: 1em;
    }

    &__question{
      font-size: 1.5em;
      font-weight: 700;
    }

    &__body {
      &:extend(.card__body);
      margin:0;
    }

    &__answers{
      list-style: none;
      padding: 0;
      margin: 0;

      a{
        padding: 15px 20px;
        border-bottom: 1px solid @white-dark;
        display:block;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
