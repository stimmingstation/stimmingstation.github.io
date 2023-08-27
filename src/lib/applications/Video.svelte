<script>
  export let videoId = ''
  export let name = ''
</script>

<div class="video">
  <iframe
    scrolling="no"
    title={videoId}
    width="1280"
    height="720"
    src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&vq=hd1080"
    allow="autoplay"
    frameborder="0"
  />
</div>

<style>
  .video {
    position: relative;
    overflow: hidden;
    width: var(--width, 540px);
    height: 720px;
  }

  .video iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
</style>
