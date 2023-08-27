<script>
    export let videoUrl;

    export let PosX = 0;
    export let PosY = 0;

  // default 16:9
  export let Width = 640
  export let Height = 360

  import Window from './Window.svelte'

  // Doesn't work :(
  // $: {
  //     const iframe = document.getElementById('youtube-iframe');
  //     if (iframe) {
  //         const iframeDocument = iframe.ownerDocument || iframe.ownerDocument.document;
  //         const videoElement = iframeDocument.querySelector('.html5-main-video');
  //         if (videoElement) {
  //             videoElement.style.height = '100%'; // Example CSS manipulation
  //             // You can perform more CSS modifications here
  //         }
  //     }
  // }

  function youtubeUrlParser(url) {
    if (url !== undefined) {
      let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
      let r = url.match(rx)
      return r[1]
    }
  }

  async function resolveTitle(videoId) {
    let response = fetch(`https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`)
    let json = await (await response).json()
    return json.title
  }

  let videoId = youtubeUrlParser(videoUrl)
  let videoTitlePromise = resolveTitle(videoId)
</script>

{#await videoTitlePromise}
  <!--Do nothing-->
{:then videoTitle}

  <Window title="YouTube - {videoTitle}" PosX={PosX} PosY={PosY} Width={Width} Height={Height}>
    <!-- Reference: https://developers.google.com/youtube/player_parameters#Parameters -->
    <div class="video">
      <iframe
          scrolling="no"
          title={videoTitle}
          src="https://www.youtube.com/embed/{videoId}?playlist={videoId}&autoplay=1&rel=0&mute=1&loop=1&controls=0&showinfo=0&playsinline=1"
          allow="autoplay"
          frameborder="0"
      />
    </div>
  </Window>

{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}

<style>
    .video {
        pointer-events: none;
    }

    .video iframe {
        position: absolute;
        width: 100%;
        height: 100%; /* Make the iframe take the full height of the container */

        /* Center the content both vertically and horizontally */
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
</style>