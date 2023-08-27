<script>
  import TaskBar from './lib/TaskBar.svelte'
  import YouTube from './lib/applications/YouTube.svelte'
  import Custom from './lib/applications/Custom.svelte'
  import { windows } from './lib/store.js'
</script>

<main class="desktop-view">
  <button
    on:click={() => {
      $windows = [
        ...$windows,
        ...[
          {
            url: 'https://www.youtube.com/watch?v=A7IMBnMU5a4',
            state: {
              x: 1351,
              y: 400,
              w: 500,
              h: 380,
            },
            params: {},
          },
        ],
      ]
    }}
  >
    Test Button
  </button>

  {#each $windows as window}
    <YouTube {window} />
    <!-- {:else if window.type === 'Custom'}
      <Custom
        Url={window.videoUrl}
        PosX={window.PosX}
        PosY={window.PosY}
        Width={window.Width}
        Height={window.Height}
      />
    {/if} -->
  {/each}

  <TaskBar />
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
