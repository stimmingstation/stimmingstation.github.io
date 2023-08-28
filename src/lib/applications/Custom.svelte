<script>
  /** @type {import('../store.js').Window} */
  export let window

  import Window from '../Window.svelte'
</script>

<Window title="Custom" state={window.state}>
  <div class="window">
    <iframe scrolling="yes" title="Custom" src={window.url} allow="autoplay" />
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
