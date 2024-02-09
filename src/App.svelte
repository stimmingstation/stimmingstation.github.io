<script>
  import TaskBar from './lib/TaskBar.svelte'
  import YouTube from './lib/applications/YouTube.svelte'
  import Custom from './lib/applications/Custom.svelte'
  import { windows } from './lib/store.js'
  import AddWindowModal from './lib/startmenu/AddWindowModal.svelte'
  import { extractYouTubeVideoId } from './lib/utils'
  import DosBox from './lib/applications/DosBox.svelte'

  let addWindowModal = false
  let newX = 25
  let newY = 30

  function openWindow(url, title = 'Custom', width = 500, height = 380) {
    $windows = [
      ...$windows,
      {
        title: title,
        url: url,
        state: {
          x: newX,
          y: newY,
          w: width,
          h: height,
        },
        params: {},
      },
    ]
    newX += 10
    newY += 10
  }

  /** @param {string} url */
  function deriveUrlType(url) {
    if (extractYouTubeVideoId(url)) return 'YouTube'
    if (url.endsWith('.jsdos')) return 'DosBox'
    return null
  }
</script>

<main class="desktop-view">
  <!--
    We use the window.state object pointer as a key to make things work
    Reference: https://learn.svelte.dev/tutorial/keyed-each-blocks
  -->
  {#each $windows as w (w.state)}
    {@const urlType = deriveUrlType(w.url)}
    {#if urlType == 'YouTube'}
      <YouTube content={w} />
    {:else if urlType == 'DosBox'}
      <DosBox content={w} />
    {:else}
      <Custom content={w} />
    {/if}
  {/each}

  <!-- HACK: should become part of the $windows store instead -->
  {#if addWindowModal}
    <AddWindowModal
      on:close={() => (addWindowModal = false)}
      on:openUrl={e => openWindow(e.detail.url)}
    />
  {/if}

  <TaskBar
    menu={[
      {
        name: 'New Window',
        click() {
          addWindowModal = true
        },
      },
      {
        name: 'JS Paint',
        click() {
          openWindow('https://jspaint.app/', 'JS Paint')
        },
      },
      {
        name: 'Compiler Explorer',
        click() {
          openWindow('https://godbolt.org', 'Compiler Explorer')
        },
      },
      {
        name: 'DOOM',
        click() {
          openWindow(
            'https://cdn.dos.zone/custom/dos/ultimate-doom.jsdos',
            'DOOM',
            533,
            354,
          )
        },
      },
      {
        name: 'Linux Shell',
        click() {
          openWindow('https://shell.segfault.net', 'SegFault')
        },
      },
      {
        name: 'GitHub',
        click() {
          window.open('https://git.stimming.club', '_blank')
        },
      },
    ]}
  />
</main>

<style>
  .desktop-view {
    background-size: cover;
    background-color: #2e6e6d;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
</style>
