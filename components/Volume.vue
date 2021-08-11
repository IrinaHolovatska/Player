<template>
  <div class="btn-volume">
    <div class="volume">
      <input :title="volumeTitle" v-model.lazy.number="volume" class="player-volume" type="range" min="0"
             max="100"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Volume",
  props: {
    videoRef: {
      default: {}
    },
  },
  data: () => ({
    volume: 100,
  }),
  watch: {
    volume() {
      this.videoRef.volume = this.volume / 100;
    }
  },
  computed: {
    volumeTitle() {
      return `Volume (${this.volume}%)`;
    }
  },
  methods: {}
}
</script>

<style>
.btn-volume {
  display: flex;
  justify-content: space-between;
}

.volume {
  margin: 15px 0;
}
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}
input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ba83ca;
  cursor: pointer;
  margin-top: -14px;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #fff;
  border-radius: 1.3px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #fff;
}

</style>
