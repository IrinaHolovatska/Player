<template>
  <div id="seek">
    <div class="player-timeline">
      <div :style="progressStyle" class="player-progress"></div>
      <div @click="seek" class="player-seeker" title="Seek"></div>
    </div>
  </div>
</template>

<script>
import VueAudioMixer from 'vue-audio-mixer';
import 'vue-audio-mixer/dist/vue-audio-mixer.min.css';

export default {
  name: "PlayerTimeLine",
  props: {
    videoRef: {
      default: {}
    },
    currentlyTimer: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  components: {VueAudioMixer},
  computed: {
    percentComplete() {
      return parseInt(this.currentlyTimer / this.duration * 100);
    },
    progressStyle() {
      return {width: `${this.percentComplete}%`};
    }
  },
  methods: {
    seek(e) {
      const bounds = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - bounds.left) / bounds.width;
      this.videoRef.currentTime = parseInt(this.videoRef.duration * seekPos);
    },
  }
}
</script>

<style>
.player-timeline {
  background-color: rgb(235, 238, 245);
  border-radius: 100px;
  height: 6px;
  width: 100%;
}

.player-progress,
.player-seeker {
  height: 6px;
  border-radius: 100px;
  z-index: 1;
}

.player-progress {
  background: linear-gradient(to right, rgb(223, 131, 241), rgb(130, 39, 159), rgb(83, 207, 224));;
  opacity: 0.9;
  z-index: 1;
}

.player-seeker {
  cursor: pointer;
  width: 100%;
  z-index: 2;
  margin-top: -6px;
}

</style>
