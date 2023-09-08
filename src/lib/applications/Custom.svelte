<script>
  /** @type {import('../store.js').Window} */
  export let window

  import Window from '../Window.svelte'
</script>

<Window title={window.title} state={window.state}>
  <div class="window">
    <iframe scrolling="yes" title="Custom" src={window.url} allow="autoplay" />
  </div>
</Window>

<style>
  .window iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
