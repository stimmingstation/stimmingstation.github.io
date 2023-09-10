<script>
  import Window from '../Window.svelte'

  /** @type {import('../store.js').WindowContent} */
  export let content
</script>

<Window title={content.title} state={content.state}>
  <div class="window">
    <iframe
      scrolling="yes"
      title={content.title}
      src={content.url}
      allow="autoplay"
    />
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
