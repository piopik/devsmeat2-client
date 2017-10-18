<template>
  <div class="card-question" v-bind:class="{ 'left' : state.left , 'right' : state.right }" >
    <div class="header">
      <div class="label">QUESTION</div>
      <div class="question">{{question}}</div>
    </div>
    <div class="body">
      <ul class="answers">
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
    &:extend(.card all);

    .header {
      background: @rose;
      color: @white;
    }

    .label{
      font-weight: 300;
      margin-bottom: 1em;
    }

    .question{
      font-size: 1.5em;
      font-weight: 700;
    }

    .body {
      margin:0;
    }

    .answers{
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
