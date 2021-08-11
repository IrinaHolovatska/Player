<template>
  <div>
    <VideoPlayer/>
  </div>
</template>

<script>
import VideoPlayer from '~/components/VideoPlayer';

export default {
  layout: 'profile',
  components: {VideoPlayer},
  methods: {}
}
</script>
<style scoped>

div {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vh;
  font-family: Lato, sans-serif;
  background: linear-gradient(90deg, rgba(223, 131, 241, 1) 0%, rgba(130, 39, 159, 1) 35%, rgba(83, 207, 224, 1) 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  -webkit-font-smoothing: antialiased;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
