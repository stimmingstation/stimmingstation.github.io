<script>
  import { onDestroy, onMount } from 'svelte'
  import Window from '../Window.svelte'

  /** @type {import('../store.js').WindowContent} */
  export let content

  /** @type HTMLDivElement */
  let dosRoot = undefined

  // @ts-ignore
  const Dos = /** @type {import('js-dos').DosPlayerFactoryType} */ (window.Dos)

  /** @type {import("js-dos").DosPlayer} */
  let dosInstance = null

  onMount(() => {
    if (!dosInstance) {
      dosInstance = Dos(dosRoot)
      dosInstance.run(content.url)
      dosInstance.setVolume(0.1)
    }
  })

  onDestroy(() => {
    if (dosInstance) {
      dosInstance.stop()
    }
  })
</script>

<Window title={content.title} state={content.state}>
  <div class="dos-root" bind:this={dosRoot}></div>
</Window>

<style>
  .dos-root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
