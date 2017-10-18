<template>
  <div class="card-leaderboard" v-bind:class="{ 'left' : state.left , 'right' : state.right }" >
    <div class="header">
      <div class="label">LEADERBOARD</div>
    </div>
    <div class="body">
      <ul class="list">
        <li v-for="user in data.leaderboard">
          <a class="user" v-bind:style="{ background : user.color }">
            <div class="cardposition">{{ user.position | position }}</div>
            <div class="name">{{ user.name }}</div>
            <div class="points">{{user.points}} PTS</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['state', 'data'],
    filters: {
      position: function (value) {
        if (!value) {
          return '-'
        } else if (value % 10 === 1 && value !== 11) {
          return value + 'st'
        } else if (value % 10 === 2) {
          return value + 'nd'
        } else if (value % 10 === 3) {
          return value + 'rd'
        } else {
          return value + 'th'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import './../styles/variables.less';
  @import './../styles/card.less';

  .card-leaderboard{
    background: @purple-dark;
    &:extend(.card all);

    .header {
      color: @white;
    }

    .label{
      font-weight: 300;
      margin-bottom: 0;
    }

    .body {
      margin: 0;
    }

    .list {
      list-style: none;
      padding: 0;
      margin: 0;

      a{
        padding: 15px 20px;
        user-select: none;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .position{
      font-size:.9em;
    }

    .name{
      font-weight:bold;
      text-transform: capitalize;
    }

    .points{
      font-size:.9em;
    }
  }
</style>
