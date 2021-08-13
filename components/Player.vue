<template>
  <section class="player">

    <div class="cover-wrapper">
      <video :src="activeVideo.src" :poster="activeVideo.cover" ref="videoPlay"></video>
      <div class="volume-fullScreen-cover">
        <Volume :videoRef="videoRef"/>
        <button class="btn-fullScreen" @click="toggle"><img src="img/fullscreen.png" alt="icon"></button>
      </div>
    </div>

    <div class="videos-details">
      <h2 class="videos-title"> {{ activeVideo.title }} </h2>
      <p class="subtitle">{{ activeVideo.subtitle }}</p>

      <PlayerTimeLine :videoRef="videoRef" :currentlyTimer="currentlyTimer" :duration="duration"/>

      <div class="timer">
        <p class="start">{{ currentlyTimer | convertTime }}</p>
        <p class="end">
          {{ duration | convertTime }}
        </p>
      </div>

      <div class="controls">
        <button class="prev" @click="prev">&#9668;</button>
        <button class="play" ref="play" v-show="!isPlaying" @click="play">&#9654;</button>
        <button class="stop" v-show="isPlaying" @click="stop"><img src="img/icons8-pause-48.png" alt="">
        </button>
        <button class="next" @click="next">&#9658;</button>
      </div>

    </div>
  </section>
</template>

<script>


import PlayerTimeLine from "./PlayerTimeLine";
import Volume from "./Volume";
import {mapGetters} from "vuex";


export default {
  name: "Player",
  components: {Volume, PlayerTimeLine},
  data: () => ({
    videoRef: {},
    isPlaying: false,
    current: {},
    index: 0,
    currentlyTimer: 0,
    duration: 0,
    fullscreen: false,
    loaded: false,
  }),
  computed: {
    ...mapGetters(['allVideo']),
    activeVideo: {
      get: function () {
        return this.$store.state.activeVideo
      },
      set: function (newValue) {
        this.$store.state.activeVideo = newValue;
      }
    }
  },

  mounted() {
    this.videoRef = this.$refs['videoPlay']
  },
  watch: {
    activeVideo: {
      immediate: true,
      handler: 'onVideoChange'
    }
  },
  filters: {
    convertTime(val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
      return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
    }
  },
  methods: {
    play() {
      this.$refs.videoPlay.play()
      this.isPlaying = true
    },
    stop() {
      this.$refs.videoPlay.pause()
      this.isPlaying = false
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.allVideo.length - 1;
      }
      this.current = this.allVideo[this.index];
      this.activeVideo = this.current;
    },
    next() {
      this.index++;
      if (this.index > this.allVideo.length - 1) {
        this.index = 0;
      }
      this.current = this.allVideo[this.index];
      this.activeVideo = this.current
    },
    onVideoChange() {
      setTimeout(() => {
        const video = this.$refs.videoPlay

        video.addEventListener('timeupdate', () => {
          this.currentlyTimer = this.$refs.videoPlay.currentTime
        })
        video.addEventListener('loadedmetadata', () => {
          this.duration = this.$refs.videoPlay?.duration;
        })
      }, 0);
    },
    toggle() {
      this.$fullscreen.toggle(this.$refs.videoPlay, {
        callback: this.fullscreenChange
      })
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>

<style>
.player {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 375px;
  max-height: 623px;
  margin: 0;
  padding: 50px 25px 25px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 15px;
  animation: scale-up-center 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.cover-wrapper {
  display: flex;
  flex-direction: column;
}

.cover-wrapper video {
  width: 270px;
  text-align: center;
  box-shadow: rgba(107, 179, 237, 0.5) 0px 24px 35px -16px;
  border-radius: 8px;
}

.videos-title {
  width: 100%;
  color: #53565a;
  font-size: 1.13em;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 25px;
}

.videos-title {
  width: 100%;
  color: #53565a;
  font-size: 1.13em;
  text-align: center;
  margin-bottom: 5px;
}

.subtitle {
  font-family: Muli, sans-serif;
  width: 100%;
  font-weight: 400;
  text-align: center;
}

@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
}

.play,
.stop {
  display: flex;
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  border-radius: 50%;
  border: none;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 17px 24px -6px rgba(0, 0, 0, .2);
  cursor: pointer;
  color: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

.play {
  font-size: 40px;
}

.next,
.prev {
  border: 0;
  border-radius: 50%;
  font-size: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, .09);
  color: #fff;
  transition: background-color .2s;
  position: relative;
}

.timer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
}

.volume-fullScreen-cover {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.btn-fullScreen {
  border: none;
  outline: none;
  background: transparent;
  margin-top: 5px;
}

.btn-fullScreen img {
  width: 45px;
}

.btn-fullScreen img:hover {
  cursor: pointer;
}

</style>
