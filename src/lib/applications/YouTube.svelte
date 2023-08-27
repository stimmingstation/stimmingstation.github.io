<script>
  /** @type {import('../store').Window} */
  export let window

  import Window from '../Window.svelte'
  import { extractYouTubeVideoId } from '../utils'

  async function resolveTitle(videoId) {
    let response = fetch(
      `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`,
    )
    let json = await (await response).json()
    return json.title
  }

  let videoId = extractYouTubeVideoId(window.url) ?? 'D3-vBBQKOYU'
  let videoTitlePromise = resolveTitle(videoId)

  /** @type Date */
  let videoStart = null
  let start = 0
  let muted = true

  function onSpecial() {
    // TODO: likely this can be replaced with the YouTube embed API
    // Reference: https://developers.google.com/youtube/iframe_api_reference
    muted = !muted
    const now = new Date()
    if (videoStart != null) {
      start = Math.trunc((now - videoStart) / 1000)
    }
  }

  $: embedUrl = (() => {
    // Reference: https://developers.google.com/youtube/player_parameters#Parameters
    let url = `https://www.youtube.com/embed/${videoId}?playlist=${videoId}`
    url += '&autoplay=1'
    url += '&rel=0'
    url += '&loop=1'
    url += '&controls=0'
    url += '&showinfo=0'
    url += '&playsinline=1'
    url += '&mute=' + (muted ? '1' : '0')
    url += `&start=${start}`
    return url
  })()

  function onIframeLoad() {
    console.log(`iframe loaded: ${window.url}`)
    if (videoStart == null) {
      videoStart = new Date()
    }
  }
</script>

{#await videoTitlePromise}
  <!--Do nothing-->
{:then videoTitle}
  <Window
    title="YouTube - {videoTitle}"
    state={window.state}
    special={muted ? '🔈' : '🔊'}
    on:special={onSpecial}
  >
    <div class="video">
      <iframe
        scrolling="no"
        title={videoTitle}
        src={embedUrl}
        allow="autoplay"
        frameborder="0"
        on:load={onIframeLoad}
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
