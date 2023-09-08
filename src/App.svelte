<script>
  import TaskBar from './lib/TaskBar.svelte'
  import YouTube from './lib/applications/YouTube.svelte'
  import Custom from './lib/applications/Custom.svelte'
  import { windows } from './lib/store.js'
  import AddWindowModal from './lib/startmenu/AddWindowModal.svelte'
  import { extractYouTubeVideoId } from './lib/utils'

  let addWindowModal = false
  let newX = 25
  let newY = 30

  function openWindow(url, title = 'Custom') {
    $windows = [
      ...$windows,
      ...[
        {
          title: title,
          url: url,
          state: {
            x: newX,
            y: newY,
            w: 500,
            h: 380,
          },
          params: {},
        },
      ],
    ]
    newX += 10
    newY += 10
  }
</script>

<main class="desktop-view">
  <!--
    We use the window.state object pointer as a key to make things work
    Reference: https://learn.svelte.dev/tutorial/keyed-each-blocks
  -->
  {#each $windows as w (w.state)}
    {#if extractYouTubeVideoId(w.url)}
      <YouTube window={w} />
    {:else}
      <Custom window={w} />
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
