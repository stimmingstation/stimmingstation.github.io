<script>
    export let videoUrl;
    export let initX;
    export let initY;
    import Workspace from "./Window.svelte";

    function youtubeUrlParser(url) {
        if (url !== undefined) {
            let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            let r = url.match(rx);
            return r[1];
        }
    }

    async function resolveTitle(videoId) {
        let response = fetch(`https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`);
        let json = await (await response).json();
        return json.title;
    }

    let videoId = youtubeUrlParser(videoUrl);
    let videoTitlePromise = resolveTitle(videoId);

</script>

{#await videoTitlePromise}
  <!--Do nothing-->
{:then videoTitle}
  <Workspace title="YouTube - {videoTitle}" posX={initX} posY={initY}>
    <div class="youtube">
      <iframe
          title="{videoTitle}"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&vq=hd1080"
          frameborder="0"
          allow="autoplay"
          allowfullscreen/>
    </div>
  </Workspace>
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}

<style>
    .youtube {
        position: relative;
        overflow: hidden;
        width: var(--width, 540px);
        height: 720px;
    }

    .youtube iframe {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
</style>