<template>
  <div class="video-player">
    <Player />
    <PlayList/>
  </div>
</template>

<script>
import Player from "./Player";
import PlayList from './PlayList';

export default {
  name: "VideoPlayer",
  components: {Player, PlayList},
}
</script>

<style>

.video-player {
  gap: 1rem;
  padding: 20px;
  min-width: 100vw;
}

@media (max-width: 768px) {
  .video-player {
    flex-wrap: wrap
  }
}
</style>
