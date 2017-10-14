<template>
  <div class="player" v-bind:class="{ 'player--active' : user.name }" >
    <div class="player__container" v-bind:style="{ background : ( user.color ? user.color : 'white' ) }">
      <div class="player__position">{{ user.position | position }}</div>
      <div class="player__name">{{ user.name }}</div>
      <div class="player__points">{{user.points}} PTS</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['user'],
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

  .player{
    width: 100vw;
    height: 50px;
    position: absolute;
    bottom:0;

    display: flex;
    flex-direction: row;
    justify-content: center;

    transition: transform @transition-time @transition-ease;
    transform: translateY(80px);

    &--active {
      transform: translateY(0px);
    }

    &__container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      height: 50px;
      min-width: @wrapper-width;
      padding: 15px;

      box-sizing: border-box;
      border-radius: @border-radius @border-radius 0 0;

      text-align: center;
    }

    &__position {
      font-size:.9em;
    }

    &__name {
      font-weight:bold;
      text-transform: capitalize;
    }

    &__points {
      font-size:.9em;
    }
  }
</style>
