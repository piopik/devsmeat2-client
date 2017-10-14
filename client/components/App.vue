<template>
  <div id="app">
    <Timer :value="timer.value" :max="timer.max" />
    <Toaster :data="toaster.data" />
    <Player :user="user" />

    <div class="centercontainer" v-bind:class=" { 'centercontainer--inactive' : question.state.left || question.state.right } ">
      <Card-Question :state="question.state" :question="question.data.question" :answers="question.data.answers" :sendAnswer="sendAnswer" />
    </div>

    <div class="centercontainer" v-bind:class=" { 'centercontainer--inactive' : !result.state.active } ">
     <Result :active="result.state.active" :correct="result.state.correct" :points="result.state.points" />
    </div>

    <div class="centercontainer" v-bind:class=" { 'centercontainer--inactive' : leaderboard.state.left || leaderboard.state.right } ">
      <Card-Leaderboard :state="leaderboard.state" :data="leaderboard.data" />
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  import config from './../config'
  import Vue from "vue/dist/vue.js"

  import CardLeaderboard from "./CardLeaderboard"
  import CardQuestion from "./CardQuestion"
  import Player from "./Player"
  import Result from "./Result"
  import Timer from "./Timer"
  import Toaster from "./Toaster"

  window.onload = () => {
    document.querySelector('#app').classList.remove('loading');
  };

  let socket = io.connect(config.engine);

  export default {
    components: {
      CardLeaderboard,
      CardQuestion,
      Player,
      Result,
      Timer,
      Toaster
    },
    data() {
      return {
        socket: socket,
        user: {},
        timer: {
          value: 0,
          max: 0
        },
        toaster: {
          state: {},
          data: []
        },
        question: {
          state: {
            left: false,
            right: true,
          },
          data: {}
        },
        leaderboard: {
          state: {
            left: false,
            right: true
          },
          data: {}
        },
        result: {
          state: {
            active: false,
            correct: false,
            points: 0
          }
        }
      }
    },
    methods: {
      sendAnswer: function (id) {
        this.socket.emit('answer', {
          'answer': [id]
        })
      },
      shuffle: function (array) {
        for (let i = array.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [array[i - 1], array[j]] = [array[j], array[i - 1]]
        }
      }
    },
    created: function () {

      const self = this;

      this.socket.on("joined", (res) => {
        self.user = res.user
        self.user.position = false
        self.user.points = 0

        config.questionTime = res.answerTime
        config.leaderboardTime = res.leaderboardTime
      })

      this.socket.on("question", (res) => {

        self.question.data = res
        self.shuffle(this.question.data.answers)

        self.timer.value = config.questionTime / 1000
        self.timer.max = config.questionTime / 1000

        self.toaster.data.length = 0

        self.question.state.right = false
        self.result.state.active = false
      })

      this.socket.on("questionResult", (res) => {
        self.result.state.active = true
        self.result.state.correct = res.correct
        self.result.state.points = res.points

        self.question.state.left = true

        self.user.points += res.points
      })

      this.socket.on("questionFinish", () =>{
        self.question.state.left = true

        self.result.state.active = false

        setTimeout(() => {
          self.question.state.left = false
          self.question.state.right = true
          self.question.state.result = false
        }, 1000)
      })

      this.socket.on("leaderboard", (res) => {
        self.result.state.active = false

        self.leaderboard.state.right = false

        self.leaderboard.data = res

        for (let i = 0; i < self.leaderboard.data.leaderboard.length; i++) {
          if (self.leaderboard.data.leaderboard[i].id === self.user.id) {
            self.user.position = self.leaderboard.data.leaderboard[i].position
          }
        }
        self.timer.value = config.leaderboardTime / 1000
        self.timer.max = config.leaderboardTime / 1000
      })

      this.socket.on("leaderboardFinish", () => {

        self.leaderboard.state.left = true

        setTimeout(() => {
          self.leaderboard.state.left = false
          self.leaderboard.state.right = true
        }, 1000)
      })

      this.socket.on("gameFinish", (res) => {
      })

      this.socket.on("message", (res) => {
        self.toaster.data.push(res)
      })

    },
    mounted: function () {
      this.timer.interval = setInterval(() => {
        if (this.timer.value > 0) {
          this.timer.value--
        }
      }, 1000)
    }
  }
</script>

<style lang="less">
  @import './../styles/variables.less';

  #app {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;

    font-family: @font-family-sans-serif;

    background: radial-gradient(@purple-light, @purple-dark);

    .centercontainer {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      perspective: 500px;

      &--inactive {
        pointer-events: none;
      }
    }

    &--loading {
      .app__centercontainer {
        display: none;
      }

      .toaster {
        display: none;
      }
    }
  }
</style>
