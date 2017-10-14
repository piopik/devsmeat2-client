<template>
  <div class="card-leaderboard" v-bind:class="{ 'card--left' : state.left , 'card--right' : state.right }" >
    <div class="card-leaderboard__header">
      <div class="card-leaderboard__label">LEADERBOARD</div>
    </div>
    <div class="card-leaderboard__body">
      <ul class="card-leaderboard__list">
        <li v-for="user in data.leaderboard">
          <a class="card-leaderboard__user" v-bind:style="{ background : user.color }">
            <div class="card-leaderboard__cardposition">{{ user.position | position }}</div>
            <div class="card-leaderboard__name">{{ user.name }}</div>
            <div class="card-leaderboard__points">{{user.points}} PTS</div>
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

<style lang="less">
  @import './../styles/variables.less';
  @import './../styles/card.less';

  .card-leaderboard{
    background: @purple-dark;
    &:extend(.card);

    &__header {
      color: @white;
      &:extend(.card__header);
    }

    &__label{
      font-weight: 300;
      margin-bottom: 0;
    }

    &__body {
      margin: 0;
      &:extend(.card__body);
    }

    &__list {
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

    &__position{
      font-size:.9em;
    }

    &__name{
      font-weight:bold;
      text-transform: capitalize;
    }

    &__points{
      font-size:.9em;
    }

  }
</style>
