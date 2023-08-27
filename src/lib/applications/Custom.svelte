<script>
  export let Url
  export let PosX
  export let PosY

  // default 16:9
  export let Width = 640
  export let Height = 360

  import Window from '../Window.svelte'

</script>

<Window title='Custom' PosX={PosX} PosY={PosY} Width={Width} Height={Height}>
  <div class='window'>
    <iframe
      scrolling='no'
      title='Custom'
      src='{Url}'
    />
  </div>
</Window>

<style>
    .window iframe {
        position: absolute;
        width: 100%;
        height: 100%; /* Make the iframe take the full height of the container */

        /* Center the content both vertically and horizontally */
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
</style>